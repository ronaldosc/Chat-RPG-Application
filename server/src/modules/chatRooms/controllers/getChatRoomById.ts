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
        data: {
          feedMessageOrigin: chatRoom.data.chatRoom[0]._id,
          playerCharacters: chatRoom.data.chatRoom[0].playerCharacters,
          owner: chatRoom.data.chatRoom[0].owner,
          title: chatRoom.data.chatRoom[0].title,
          content: chatRoom.data.chatRoom[0].content,
          image: chatRoom.data.chatRoom[0].image,
          numberOfPlayers: chatRoom.data.chatRoom[0].numberOfPlayers,
          waitingForResponse: chatRoom.data.chatRoom[0].waitingForResponse,
          createdAt: chatRoom.data.chatRoom[0].createdAt,
        },
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
