import { webSocket } from '@config';
import { AuthenticatedUserDataRequestModel } from '@interfaces';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { deleteComment } from '@services/feedMessageComments';

export async function deleteFeedComment(req: Request, res: Response): Promise<void> {
  const commentId = new Types.ObjectId(req.params.commentId);
  const author = (req as AuthenticatedUserDataRequestModel).userId;
  const result = await deleteComment(author, commentId);

  if (!result.error) {
    const message = {
      action: 'dec-comment',
      data: {
        chatRoom: 'feedRoom',
        message: result,
      },
    };

    await webSocket.redisPub.publish('feedRoom', JSON.stringify(message));

    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
