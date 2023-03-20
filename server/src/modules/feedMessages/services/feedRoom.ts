import websocket from 'ws';
import crypto from 'node:crypto';

class WebSocketServices {
  public websocketClients: any = {};

  private createUserID(ws: websocket) {
    const userID = crypto.randomUUID();
    this.websocketClients[userID] = ws;
    console.log(`connected: ${userID} in ${Object.getOwnPropertyNames(this.websocketClients)}`);
    return;
  }
}
//TODO arquivo parece repetido com outro que tem classe com mesmo nome
export default WebSocketServices;
