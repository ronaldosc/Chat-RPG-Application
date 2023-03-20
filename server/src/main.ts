import { redisConfig, webSocket } from '@config';
import { Env } from '@env';
import { chatFeedRoutes, chatRoomRoutes, feedCommentRoutes, feedRoutes, reactionRoutes, userRoutes } from '@routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import Redis from 'ioredis';
import { error, log } from 'node:console';

const PORT = +Env('PORT') || 5000;
const app: express.Application = express();
const redisSub = new Redis(redisConfig.socket);

webSocket.initialize();

app.use('/', express.static('./views'));
app.use(
  cors({
    origin: Env('CORS_ORIGIN'),
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/feed-message', feedRoutes);
app.use('/chat-room', chatRoomRoutes);
app.use('/feed-chat', chatFeedRoutes);
app.use('/reaction', reactionRoutes);
app.use('/feed-comment', feedCommentRoutes);

// Listen for messages on the Redis channel
redisSub
  .subscribe('feedRoom')
  .then(() => {
    log('Subscribed to feedRoom channel');
  })
  .catch((err) => {
    error('Failed to subscribe to feedRoom channel:', err);
  });

redisSub.on('message', (channel, message) => {
  // Send the message to all connected clients
  const { action, data } = JSON.parse(message);
  log('action ', action);
  log('chatroom ', data.chatRoom);
  log('message ', data.message);

  if (data.chatRoom === 'feedRoom') {
    webSocket.websocketClients.forEach((ws, userId) => {
      log(userId);
      ws.send(message);
    });
  }

  const room = webSocket.roomClients.get(data.chatRoom) || [];
  log(room);
  room.forEach((id) => {
    webSocket.websocketClients.get(id)?.send(message);
  });
});

app.listen(PORT, () => {
  log(`Servidor rodando na porta ${PORT}`);
});

export { webSocket };
