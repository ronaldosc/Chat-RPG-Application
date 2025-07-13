import { Request, Response } from 'express';
import { deleteChatRoomPlayerId } from '../services';
import { ICharacter } from '../interface';
import { webSocketInitializer } from '../../../index';
import { AuthenticatedUserDataRequest } from '../../../interfaces';

export async function deleteChatRoomPlayer(req: Request, res: Response): Promise<void> {
  const param: ICharacter = req.body;
  if (!param.chatRoomId || !param.playerCharacterId || !param.playerId) {
    res.status(400).json({ message: 'Missing required fields in request body' });
    return;
  }
  const owner = (req as AuthenticatedUserDataRequest).userId;

  const chatRoom = await deleteChatRoomPlayerId(param, owner);

  if (!chatRoom.error) {
    const roomId = param.chatRoomId.toString();
    const clientws = webSocketInitializer.userClients.get(param.playerId.toString());
    const clients = webSocketInitializer.roomClients.get(roomId) || [];
    const filteredClients = clients.filter((element) => element !== clientws);
    webSocketInitializer.roomClients.set(roomId, filteredClients);

    res.status(200).json(chatRoom);
    return;
  }

  res.status(chatRoom.error).json(chatRoom.message);
  return;
}
