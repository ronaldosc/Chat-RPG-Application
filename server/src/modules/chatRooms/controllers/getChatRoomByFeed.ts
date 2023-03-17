import { Request, Response } from 'express';
import { getChatRoomByFeedId } from '../services';
import { getChatFeedMessagesByChatId } from '../../chatMessages/services';
import { ChatRoomsModel } from '../interface';

export async function getChatRoomByFeed(req: Request, res: Response): Promise<void> {
  const feedMessageId = req.params.feedMessageId;

  const chatRoom = await getChatRoomByFeedId(feedMessageId);

  const chatMessages = await getChatFeedMessagesByChatId(chatRoom.data.chatRoom._id.toString());

  if (!chatRoom.error && !chatMessages.error) {
    const chatRoomInfo: ChatRoomsModel = chatRoom.data.chatRoom;
    const result = { ...chatRoomInfo, messages: chatMessages.data.chatMessage };
    res.status(200).json(result);
    return;
  }

  res.status(500).json({ message: 'Erro ao selecionar chatRoom com chatMessages' });
  return;
}
