import { Request, Response } from 'express';
import { getChatRoom } from '@services/chatRooms';

export async function getChatRoomById(req: Request, { status }: Response): Promise<void> {
  const chatRoom = await getChatRoom(req.params.chatRoomId);

  if (!chatRoom.error) {
    let result = {};
    if (chatRoom.data.chatRoom.length === 1) {
      result = {
        message: 'chatRoom selecionado com sucesso!',
        data: { chatRoom: chatRoom.data.chatRoom[0] },
      };
    } else {
      result = {
        message: 'chatRoom selecionado com sucesso!',
        data: {},
      };
    }
    //TODO duas mensagens idênticas?

    status(200).json(result);
    return;
  }

  status(chatRoom.error).json(chatRoom.message);
  return;
}
