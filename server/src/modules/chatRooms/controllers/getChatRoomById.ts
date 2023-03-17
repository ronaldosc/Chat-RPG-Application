import { Request, Response } from 'express';
import { getChatRoom } from '../services';

export async function getChatRoomById(req: Request, res: Response): Promise<void> {
  const chatRoomId = req.params.chatRoomId;

  const chatRoom = await getChatRoom(chatRoomId);

  if (!chatRoom.error) {
    let result = {};
    if ( chatRoom.data.chatRoom.length === 1 ){
      result = {
        message: 'chatRoom selecionado com sucesso!',
        data: { ... chatRoom.data.chatRoom[0] },
      };
    } else {
      result = {
        message: 'chatRoom selecionado com sucesso!',
        data: {},
      }
    }

    res.status(200).json(result);
    return;
  }

  res.status(chatRoom.error).json(chatRoom.message);
  return;
}
