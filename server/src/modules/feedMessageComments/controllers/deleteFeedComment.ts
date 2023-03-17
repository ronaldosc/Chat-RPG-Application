import { Types } from 'mongoose';
import { Request, Response } from 'express';
import { webSocketInitializer } from '../../../index';
import { deleteComment } from '../services';
import { AuthenticatedUserDataRequest } from '../../../interfaces';

export async function deleteFeedComment(req: Request, res: Response): Promise<void> {

  const commentId = new Types.ObjectId(req.params.commentId);
  const author = (req as AuthenticatedUserDataRequest).userId;

  const result = await deleteComment(author, commentId);

  if (!result.error) {
    const message = {
      action: 'dec-comment',
      data: {
          chatRoom: 'feedRoom',
          message: result,
      },
    };

    await webSocketInitializer.redisPub.publish('feedRoom', JSON.stringify(message));

    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
