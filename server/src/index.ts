import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Redis from 'ioredis';
import { redisConfig } from './config/redisdb';
import cors from 'cors';

import { WebSocketInitializer } from './websocket';

import userRoutes from './modules/users/routes';
import feedRoutes from './modules/feedMessages/routes';

const PORT = parseInt(process.env.PORT) || 5000;
const redisSub = new Redis(redisConfig.socket);

const app: express.Application = express();
const webSocketInitializer = new WebSocketInitializer();

webSocketInitializer.initialize();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use('/', express.static('./views'));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/feed-room', feedRoutes);

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
  webSocketInitializer.websocketClients.forEach((ws, userId) => {
    console.log(userId);
    ws.send(message);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { webSocketInitializer };
