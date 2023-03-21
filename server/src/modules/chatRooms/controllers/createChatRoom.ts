import { Request, Response } from 'express';
import * as ChatRoomServices from '../services';
import { getFeedMessage } from '../../feedMessages/services';
import { webSocketInitializer } from '../../../index';
import { AuthenticatedUserDataRequest } from '../../../interfaces';

export async function createChatRoom(req: Request, res: Response): Promise<void> {
  const messageId = req.params.feedMessageId;

  const chats = await ChatRoomServices.getChatRoomIdByFeedId(messageId);
  if (chats.data.chat.length>0 ){
    res.status(500).json({ message: 'Já existe um chat room com este feed de origem' });
    return;
  }

  const feedOrigin = await getFeedMessage(messageId);

  if (!feedOrigin.error){

    const owner = (req as AuthenticatedUserDataRequest).userId;

    if (feedOrigin.data.feedMessage[0].owner != owner) {
      res.status(500).json({ message: 'Usuário não é dono do feed de origem' });
      return;
    }

    const newChatRoom = {
      feedMessageOrigin: feedOrigin.data.feedMessage[0]._id,
      playerCharacters: feedOrigin.data.feedMessage[0].playerCharacters,
      owner: feedOrigin.data.feedMessage[0].owner,
      title: feedOrigin.data.feedMessage[0].title,
      content: feedOrigin.data.feedMessage[0].content,
      image: feedOrigin.data.feedMessage[0].image,
      numberOfPlayers: feedOrigin.data.feedMessage[0].numberOfPlayers,
      waitingForResponse: false,
      createdAt: feedOrigin.data.feedMessage[0].createdAt,
    };

    const result = await ChatRoomServices.create(newChatRoom);

    if (!result.error) {
      // join-chatroom
      const user = result.data.newChatRoom.owner.toString();
      const roomId = result.data.newChatRoom._id.toString();
      const clients = webSocketInitializer.roomClients.get(roomId) || [];
      const clientws = webSocketInitializer.userClients.get(user);
      clients.push(clientws);

      for (let i = 0; i < result.data.newChatRoom.playerCharacters.length; i++) {
        if (result.data.newChatRoom.playerCharacters[i].player) {
          const clientws = webSocketInitializer.userClients.get(
            result.data.newChatRoom.playerCharacters[i].player.toString(),
          );
          clients.push(clientws);
        }
      }
      webSocketInitializer.roomClients.set(roomId, clients);

      res.status(200).json(result);
      return;

    }

    res.status(result.error).json(result.message);
    return;
  }

  res.status(feedOrigin.error).json(feedOrigin.message);
  return;
}
