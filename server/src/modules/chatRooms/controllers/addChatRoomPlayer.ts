import { ICharacter } from '@interfaces';
import { Request, Response } from 'express';
import { addChatRoomPlayerId } from '@services/chatRooms';
import { webSocket } from '@config';

export async function addChatRoomPlayer(req: Request, { status }: Response): Promise<void> {
  const {
    body: {
      param,
      param: { playerId, chatRoomId },
    },
  }: { body: { param: ICharacter } } = req;
  const chatRoom = await addChatRoomPlayerId(param);

  if (!chatRoom.error) {
    const roomId = chatRoomId.toString();
    const openedRoom = webSocket.roomClients.get(roomId) || [];
    const roomUsers = webSocket.userClients.get(playerId.toString());
    openedRoom.push(roomUsers);
    webSocket.roomClients.set(roomId, openedRoom);

    status(200).json(chatRoom);
    return;
  }

  status(chatRoom.error).json(chatRoom.message);
  return;
}
