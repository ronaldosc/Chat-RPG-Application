import { Request, Response } from 'express';
import { addChatRoomPlayerId } from '../services';
import { AuthenticatedUserDataRequest } from '../../../interfaces';
import { ICharater } from '../interface';
import { webSocketInitializer } from '../../../index';

export async function addChatRoomPlayer(req: Request, res: Response): Promise<void> {

  const param: ICharater = req.body;

  const chatRoom = await addChatRoomPlayerId(param);

  if (!chatRoom.error) {

    const roomId = param.chatRoomId.toString();
    const clients = webSocketInitializer.roomClients.get(roomId) || [];
    const clientws = webSocketInitializer.userClients.get(param.playerId.toString());
    clients.push(clientws);
    webSocketInitializer.roomClients.set(roomId, clients);

    res.status(200).json(chatRoom);
    return;
  }

  res.status(chatRoom.error).json(chatRoom.message);
  return;
}
