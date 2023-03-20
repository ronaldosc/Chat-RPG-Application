import { webSocket } from '@config';
import { AuthenticatedUserDataRequestModel, FeedMessagesModel } from '@interfaces';
import { Request, Response } from 'express';
import { create } from '@services/feedMessages';
import { Types } from 'mongoose';

export async function createFeed(req: Request, res: Response): Promise<void> {
  const feedData: Omit<FeedMessagesModel, 'updatedAt' | 'deletedAt'> & { _id: Types.ObjectId } = req.body;
  feedData['owner'] = (req as AuthenticatedUserDataRequestModel).userId;
  const result = await create(feedData);

  if (!result.error) {
    const newPost = {
      ...result,
    };

    const message = {
      action: 'message',
      data: {
        chatRoom: 'feedRoom',
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
