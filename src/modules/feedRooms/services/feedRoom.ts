import websocket from 'ws';
import crypto from 'crypto';

class WebSocketServices {

  public websocketClients: any = {};

  private createUserID(ws: websocket) {
    const userID = crypto.randomUUID();
    this.websocketClients[userID] = ws;
    console.log(`connected: ${userID} in ${Object.getOwnPropertyNames(this.websocketClients)}`,);
    return;
  }

}

export default WebSocketServices;
