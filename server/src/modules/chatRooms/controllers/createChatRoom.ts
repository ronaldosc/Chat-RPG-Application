import { webSocket } from '@config';
import { AuthenticatedUserDataRequestModel, ChatRoomsModel, FeedMessagesModel } from '@interfaces';
import { Request, Response } from 'express';
import { getFeedMessage } from '@services/feedMessages';
import { create } from '@services/chatRooms';

export async function createChatRoom(req: Request, res: Response): Promise<void> {
  const feedOrigin = (await getFeedMessage(req.params.feedMessageId)).data.feedMessage;
  const owner = (req as AuthenticatedUserDataRequestModel).userId;
  const { ...rest } = feedOrigin[0] as Omit<
    FeedMessagesModel,
    'numberOfComments' | 'numberOfLikes' | 'updatedAt' | 'deletedAt'
  >;

  if (feedOrigin[0].owner !== owner) {
    res.status(500).json({ message: 'usuário não é dono do feed de origem' });
    return;
  }

  const {} = feedOrigin[0];
  const newChatRoom: Omit<ChatRoomsModel, 'updatedAt' | 'deletedAt'> = {
    feedMessageOrigin: feedOrigin[0]._id,
    waitingForResponse: false,
    description: feedOrigin[0].content,
    ...rest,
  };

  const result = await create(newChatRoom);

  if (!result.error) {
    // join-chatroom
    const user = result.data.newChatRoom.owner.toString();
    const roomId = result.data.newChatRoom._id.toString();
    const roomClients = webSocket.roomClients.get(roomId) || [];
    const clients = webSocket.userClients.get(user);
    roomClients.push(clients);

    for (let i = 1; i < result.data.newChatRoom.playerCharacters.length; i++) {
      if (result.data.newChatRoom.playerCharacters[i].player) {
        const clients = webSocket.userClients.get(result.data.newChatRoom.playerCharacters[i].player.toString());
        roomClients.push(clients);
      }
    }
    webSocket.roomClients.set(roomId, roomClients);

    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
