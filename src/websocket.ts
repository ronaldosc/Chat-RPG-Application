import websocket from 'ws';
import crypto from 'crypto';
import redis from 'ioredis';
import * as dotenv from 'dotenv';
import feedRoomPost from './modules/feedRooms/model';
import { connectToMongoDB } from './config/mongodb';
import { ErrorWithStatus } from './utils/errorWithStatus';

dotenv.config();

class WebSocketInitializer {
  public wss: websocket.Server;

  public websocketClients = new Map();

  public redisPub =  redis.createClient();

  constructor() {
    this.wss = new websocket.Server({
      port: Number(process.env.PORT)+1 || 8001,
      host: process.env.HOST
    });
  }

  public initialize() {
    this.wss.on('connection', async (ws: websocket) => {
      const userID = crypto.randomUUID();
      this.websocketClients.set(userID, ws);
      console.log(`Client connected ${userID}`);

      try {
        await connectToMongoDB();
        const documents = await feedRoomPost.find()
        .sort({ _id: -1 })
        .limit(10);
        ws.send(JSON.stringify(documents));
      } catch(error) {
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

      ws.on('close', async (ws) => {
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
