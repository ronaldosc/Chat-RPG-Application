import { Request, Response } from 'express';
import { getChatFeedMessagesByChatId } from '@services/chatMessages';

export async function getChatFeedMessagesByChat(req: Request, { status }: Response): Promise<void> {
  const chatMessages = await getChatFeedMessagesByChatId(req.params.chatRoomId);

  if (!chatMessages.error) {
    status(200).json(chatMessages);
    return;
  }

  status(chatMessages.error).json(chatMessages.message);
  return;
}
