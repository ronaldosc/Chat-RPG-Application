import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import RateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import { redisConfig } from './config/redisdb';
import cors from 'cors';
import path from 'path';
import https from 'https';
import fs from 'fs';

import { WebSocketInitializer } from './websocket';

import userRoutes from './modules/users/routes';
import feedRoutes from './modules/feedMessages/routes';
import chatRoomRoutes from './modules/chatRooms/routes';
import chatFeedRoutes from './modules/chatMessages/routes';
import reactionRoutes from './modules/feedMessageLikes/routes';
import feedCommentRoutes from './modules/feedMessageComments/routes';

const PORT = parseInt(process.env.PORT) || 5000;
const redisSub = new Redis(redisConfig.socket);

const app: express.Application = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use('/', express.static(path.join(__dirname, '/public')));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/feed-room', feedRoutes);
app.use('/chat-room', chatRoomRoutes);
app.use('/feed-chat', chatFeedRoutes);
app.use('/reaction', reactionRoutes);
app.use('/feed-comment', feedCommentRoutes);

const wildcardRateLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

app.get('*', wildcardRateLimiter, function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, './chat-rpg.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './chat-rpg.pem-chain')),
}

const httpsServer = https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const webSocketInitializer = new WebSocketInitializer(httpsServer);

webSocketInitializer.initialize();

// Listen for messages on the Redis channel
redisSub
  .subscribe('feedRoom')
  .then(() => {
    console.log('Subscribed to feedRoom channel');
  })
  .catch((error) => {
    console.error('Failed to subscribe to feedRoom channel:', error);
  });

redisSub.on('message', (channel, message) => {
  // Send the message to all connected clients
  const { action, data } = JSON.parse(message);
  console.log('action ', action);
  console.log('chatroom ', data.chatRoom);
  console.log('message ', data.message);

  if (data.chatRoom === 'feedRoom') {
    webSocketInitializer.websocketClients.forEach((ws, userId) => {
      console.log(userId);
      ws.send(message);
    });
  } else {
    const room = webSocketInitializer.roomClients.get(data.chatRoom) || [];
    console.log(room);
    room.forEach((id) => {
      webSocketInitializer.websocketClients.get(id)?.send(message);
    });
  }
});

export { webSocketInitializer };
