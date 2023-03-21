import { DecodeDataModel } from '@interfaces';
import { getChatRoomsListByUserId } from '@services/chatRooms';
import Redis from 'ioredis';
import { verify } from 'jsonwebtoken';
import { dir, log } from 'node:console';
import { randomUUID } from 'node:crypto';
import websocket from 'ws';
import { redisConfig } from './redisDb-';
import { Env } from '@env';

class WebSocketInitializer {
  public wss: websocket.Server;
  public websocketClients = new Map<string, websocket>(); // relaciona clientId(ws) com a conexão ws
  public userClients = new Map<string, string>(); // relaciona userId com clientId(ws)
  public roomClients = new Map<string, string[]>(); // relaciona roomId com clientId(ws)
  public redisPub = new Redis(redisConfig.socket);

  constructor() {
    this.wss = new websocket.Server({
      port: 5001,
    });
  }

  public initialize() {
    this.wss.on('connection', async (ws: websocket) => {
      const clientId = randomUUID();

      this.websocketClients.set(clientId, ws);
      log(`Client connected ${clientId}`);

      ws.on('message', async (message: string) => {
        const { action, data } = JSON.parse(message);
        dir({ action: action, chatroom: data.chatRoom, token: data.token, message: data.message });

        switch (action) {
          case 'join-feedRoom': // just connect to server
            const token = data.token || `User ${clientId}`;
            const decoded = verify(token, Env('JWT_SECRET')) as DecodeDataModel;
            const user = decoded.userId;

            const chatRooms = await getChatRoomsListByUserId(user);
            this.userClients.set(user, clientId);

            // adicionando chatRooms ao qual o usuário pertence
            if (!chatRooms.error) {
              for (let i = 0; i < chatRooms.data.chatRooms.length; i++) {
                const roomId = chatRooms.data.chatRooms[i]._id.toString();
                const clients = this.roomClients.get(roomId) || [];
                clients.push(clientId); // adicionando cliente atual na lista de usuarios na sala
                this.roomClients.set(roomId, clients);
              }
            }

            log('roomClients ', this.roomClients);
            log('userClients ', this.userClients);
            break;
        }
      });

      ws.on('close', async () => {
        this.websocketClients.delete(clientId);
        log(`Client closed ${clientId}`);
      });

      ws.on('disconnect', async () => {
        this.websocketClients.delete(clientId);
        log(`Client disconnected ${clientId}`);
      });

      ws.on('error', () => {
        this.websocketClients.delete(clientId);
        log(`Client error ${clientId}`);
      });
    });
  }
}

export { WebSocketInitializer };
