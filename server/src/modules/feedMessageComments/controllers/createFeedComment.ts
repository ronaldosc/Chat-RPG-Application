import { webSocket } from '@main';
import { AuthenticatedUserDataRequestModel, FeedMessageCommentsModel } from '@interfaces';
import { Request, Response } from 'express';
import { create } from '@services/feedMessageComments';

export async function createFeedComment(req: Request, res: Response): Promise<void> {
  const param: FeedMessageCommentsModel = req.body;
  param.author = (req as AuthenticatedUserDataRequestModel).userId;
  const result = await create(param);

  if (!result.error) {
    const message = {
      action: 'inc-comment',
      data: {
        chatRoom: 'feedRoom',
        message: param,
      },
    };

    await webSocket.redisPub.publish('feedRoom', JSON.stringify(message));

    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
