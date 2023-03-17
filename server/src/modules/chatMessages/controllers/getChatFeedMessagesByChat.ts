import { Request, Response } from 'express';
import { getChatFeedMessagesByChatId } from '../services';

export async function getChatFeedMessagesByChat(req: Request, res: Response): Promise<void> {
  const chatRoomId = req.params.chatRoomId;

  const chatMessages = await getChatFeedMessagesByChatId(chatRoomId);

  if (!chatMessages.error) {
    res.status(200).json(chatMessages);
    return;
  }

  res.status(chatMessages.error).json(chatMessages.message);
  return;
}
