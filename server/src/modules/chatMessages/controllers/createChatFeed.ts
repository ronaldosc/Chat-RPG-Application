import { AuthenticatedUserDataRequestModel, ChatFeedMessagesModel } from '@interfaces';
import { webSocket } from 'main';
import { Request, Response } from 'express';
import { create } from '@services/chatMessages';

export async function createChatFeed(req: Request, res: Response): Promise<void> {
  const feedData: ChatFeedMessagesModel = req.body;
  feedData['author'] = (req as AuthenticatedUserDataRequestModel).userId;
  const result = await create(feedData);

  if (!result.error) {
    const { _id, chatRoomId, choices, createdAt, author, content, image, directedTo } = result.data.newFeed;
    const newPost = {
      _id,
      chatRoomId,
      choices,
      createdAt,
      author,
      content,
      image,
      directedTo,
    };

    const message = {
      action: 'message',
      data: {
        chatRoom: chatRoomId,
        message: newPost,
      },
    };

    await webSocket.redisPub.publish('feedRoom', JSON.stringify(message));

    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
