/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import websocket from 'ws';
import crypto from 'crypto';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';
import { FeedMessages } from './modules/feedMessages/model';
import { connectToMongoDB } from './config/mongodb';
import { ErrorWithStatus } from './utils/errorWithStatus';
import { redisConfig } from './config/redisdb';

dotenv.config();

class WebSocketInitializer {
  public wss: websocket.Server;

  public websocketClients = new Map();

  public redisPub = new Redis(redisConfig.socket);

  constructor() {
    this.wss = new websocket.Server({
      port: 5001,
    });
  }

  public initialize() {
    this.wss.on('connection', async (ws: websocket) => {
      const userID = crypto.randomUUID();
      this.websocketClients.set(userID, ws);
      console.log(`Client connected ${userID}`);

      try {
        await connectToMongoDB();
        const documents = await FeedMessages.find().sort({ _id: -1 }).limit(10);
        ws.send(JSON.stringify(documents));
      } catch (error) {
        let errorStatus: number | null;
        let errorMessage: string | null;
        if (error instanceof ErrorWithStatus) {
          errorStatus = error.getStatus();
          errorMessage = error.message;
        }
        return {
          error: errorStatus ?? 500,
          message: errorMessage ?? 'Erro ao adicionar feed',
        };
      }

      ws.on('message', async (message: string) => {
        console.log('message ', message);
        // this.wss.clients.forEach((client) => {
        //   client.send(JSON.stringify(message));
        // });
      });

      ws.on('close', async () => {
        this.websocketClients.delete(userID);
        console.log(`Client closed ${userID}`);
      });

      ws.on('disconnect', async () => {
        this.websocketClients.delete(userID);
        console.log(`Client disconnected ${userID}`);
      });

      ws.on('error', () => {
        this.websocketClients.delete(userID);
        console.log(`Client error ${userID}`);
      });
    });
  }
}

export { WebSocketInitializer };
