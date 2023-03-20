import { Request, Response } from 'express';
import { ChatRoomsModel } from '@interfaces';
import { getChatFeedMessagesByChatId } from '@services/chatMessages';
import { getChatRoomByFeedId } from '@services/chatRooms';

export async function getChatRoomByFeed(req: Request, { status }: Response): Promise<void> {
  const chatRoom = await getChatRoomByFeedId(req.params.feedMessageId);
  const chatMessages = await getChatFeedMessagesByChatId(chatRoom.data.chatRoom._id.toString());

  if (!(chatRoom.error && chatMessages.error)) {
    const chatRoomInfo: ChatRoomsModel = chatRoom.data.chatRoom;
    const result = { ...chatRoomInfo, messages: chatMessages.data.chatMessage };
    status(200).json(result);
    return;
  }

  status(500).json({ message: 'Erro ao selecionar chatRoom com chatMessages' });
  return;
}
