import { Request, Response } from 'express';
import { FeedMessageLikesModel } from '../interface';
import * as reactionServices from '../services';
import { webSocketInitializer } from '../../../index';
import { AuthenticatedUserDataRequest } from '../../../interfaces';

export async function likeFeed(req: Request, res: Response): Promise<void> {
  const likeData: FeedMessageLikesModel = req.body;
  likeData['author'] = (req as AuthenticatedUserDataRequest).userId;

  const result = await reactionServices.like(likeData);

  if (!result.error) {
    const message = {
      action: 'like-feed',
      data: {
        message: result.data.newLike,
      },
    };

    await webSocketInitializer.redisPub.publish('feedRoom', JSON.stringify(message));

    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
