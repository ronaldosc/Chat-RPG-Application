import { webSocket } from '@main';
import { AuthenticatedUserDataRequestModel, FeedMessageLikesModel } from '@interfaces';
import { Request, Response } from 'express';
import { like } from '@services/feedMessageLikes';

export async function likeFeed(req: Request, res: Response): Promise<void> {
  const likeData: FeedMessageLikesModel = req.body;
  likeData['author'] = (req as AuthenticatedUserDataRequestModel).userId;
  const result = await like(likeData);

  if (!result.error) {
    const message = {
      action: 'like-feed',
      data: {
        message: result.data.addLike,
      },
    };

    await webSocket.redisPub.publish('feedRoom', JSON.stringify(message));

    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
