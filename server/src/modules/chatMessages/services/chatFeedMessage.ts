import { randomUUID } from 'node:crypto';
import websocket from 'ws';

export class WebSocketServices {
  public websocketClients: any = {};

  private createUserID(ws: websocket) {
    const userID = randomUUID();
    this.websocketClients[userID] = ws;
    console.log(`connected: ${userID} in ${Object.getOwnPropertyNames(this.websocketClients)}`);
    return;
  }
}
//TODO falta usar o private ali do createUserID, e a classe é sobre WebSocket, então se for o caso transferir lá para o config, ou colocar no mesmo arquivo do websocket de lá.
//TODO parece quase o mesmo repetindo no "feedRoom.ts"
