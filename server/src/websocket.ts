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
import { getChatRoomsListByUserId } from './modules/chatRooms/services';
import { ObjectId, Types } from 'mongoose';

dotenv.config();

class WebSocketInitializer {

  public wss: websocket.Server;
  public websocketClients = new Map<string, websocket>();   // relaciona clientId(ws) com a conexão ws
  public userClients = new Map<string, string>();   // relaciona userId com clientId(ws)
  public roomClients = new Map<string, string[]>();   // relaciona roomId com clientId(ws)
  public redisPub = new Redis(redisConfig.socket);
  public redisClient = new Redis();

  constructor() {
    this.wss = new websocket.Server({
      port: 5001,
    });
  }

  public initialize() {
    this.wss.on('connection', async (ws: websocket) => {
      const clientId = crypto.randomUUID();

      this.websocketClients.set(clientId, ws);
      console.log(`Client connected ${clientId}`);

      ws.on('message', async (message: string) => {
        const{ action, data } = JSON.parse(message);
        console.log('action ', action);
        console.log('chatroom ', data.chatRoom);
        console.log('user' , data.user);
        console.log('message ', data.message);

        switch (action) {
          case 'join-feedRoom':  // just connect to server (it will receive the last 10 feeds)
            const user = data.user || `User ${clientId}`;
            const chatRooms = await getChatRoomsListByUserId(user);
            this.userClients.set(user, clientId);

            // adicionando chatRooms ao qual o usuário pertence
            if (!chatRooms.error) {
              for (let i=0; i<chatRooms.data.chatRooms.length; i++) {
                const roomId = chatRooms.data.chatRooms[i]._id.toString();
                const clients = this.roomClients.get(roomId) || [];
                clients.push(clientId); // adicionando cliente atual na lista de usuarios na sala
                this.roomClients.set(roomId, clients);
              }
            }

            console.log('roomClients ', this.roomClients);
            console.log('userClients ', this.userClients);

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
            break;
        }

      });

      ws.on('close', async () => {
        this.websocketClients.delete(clientId);
        console.log(`Client closed ${clientId}`);
      });

      ws.on('disconnect', async () => {
        this.websocketClients.delete(clientId);
        console.log(`Client disconnected ${clientId}`);
      });

      ws.on('error', () => {
        this.websocketClients.delete(clientId);
        console.log(`Client error ${clientId}`);
      });
    });
  }
}

export { WebSocketInitializer };
