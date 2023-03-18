import { Request, Response } from 'express';
import { FeedMessageCommentsModel } from '../interface';
import { webSocketInitializer } from '../../../index';
import { create } from '../services';
import { AuthenticatedUserDataRequest } from '../../../interfaces';

export async function createFeedComment(req: Request, res: Response): Promise<void> {
  const param: FeedMessageCommentsModel = req.body;
  param.author = (req as AuthenticatedUserDataRequest).userId;

  const result = await create(param);

  if (!result.error) {
    const message = {
      action: 'inc-comment',
      data: {
        chatRoom: 'feedRoom',
        message: param,
      },
    };

    await webSocketInitializer.redisPub.publish('feedRoom', JSON.stringify(message));

    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
