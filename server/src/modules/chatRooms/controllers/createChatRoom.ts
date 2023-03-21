import { webSocket } from '@main';
import { AuthenticatedUserDataRequestModel, ChatRoomsModel, FeedMessagesModel } from '@interfaces';
import { Request, Response } from 'express';
import { getFeedMessage } from '@services/feedMessages';
import { create, getChatRoomIdByFeedId } from '@services/chatRooms';

export async function createChatRoom(req: Request, { status }: Response): Promise<void> {
  const messageId = req.params.feedMessageId;
  const chats = (await getChatRoomIdByFeedId(messageId)).data.chat;
  if (chats.length > 0) {
    status(500).json({ message: 'Já existe um chat room com este feed de origem' });
    return;
  }
  const feedOrigin = await getFeedMessage(messageId);
  const {
    data: { feedMessage },
  } = feedOrigin;
  const { ...rest } = feedMessage[0] as Omit<
    FeedMessagesModel,
    'numberOfComments' | 'numberOfLikes' | 'updatedAt' | 'deletedAt'
  >;

  if (!feedOrigin.error) {
    const owner = (req as AuthenticatedUserDataRequestModel).userId;

    if (feedMessage[0].owner !== owner) {
      status(500).json({ message: 'usuário não é dono do feed de origem' });
      return;
    }

    const {} = feedMessage[0];
    const newChatRoom: Omit<ChatRoomsModel, 'updatedAt' | 'deletedAt'> = {
      feedMessageOrigin: feedMessage[0]._id,
      waitingForResponse: false,
      description: feedMessage[0].content,
      ...rest,
    };

    const result = await create(newChatRoom);
    const {
      data: { newChatRoom: createdChatRoom },
    } = result;

    if (!result.error) {
      // join-chatroom
      const user = createdChatRoom.owner.toString();
      const roomId = createdChatRoom._id.toString();
      const roomClients = webSocket.roomClients.get(roomId) || [];
      const clients = webSocket.userClients.get(user);
      roomClients.push(clients);

      for (let i = 0; i < createdChatRoom.playerCharacters.length; i++) {
        if (createdChatRoom.playerCharacters[i].player) {
          const clientWs = webSocket.userClients.get(createdChatRoom.playerCharacters[i].player.toString());
          roomClients.push(clientWs);
        }
      }
      webSocket.roomClients.set(roomId, roomClients);

      status(200).json(result);
      return;
    }

    status(result.error).json(result.message);
    return;
  }

  status(feedOrigin.error).json(feedOrigin.message);
  return;
}
