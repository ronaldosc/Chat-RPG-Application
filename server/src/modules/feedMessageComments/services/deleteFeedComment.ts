/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedMessageComments } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { FeedMessages } from '../../feedMessages/model';
import { Types } from 'mongoose';

export async function deleteComment(author: Types.ObjectId, commentId: Types.ObjectId) {
  try {
    await connectToMongoDB();

    const comments = await FeedMessageComments.findOne({ _id: commentId, deletedAt: null });
    if (comments.author != author) {
      return {
        error: 500,
        message: 'Author do comentário não é o usuário logado!',
        data: {},
      };
    }

    const delComment = await FeedMessageComments.updateOne(
      { _id: commentId, deletedAt: null },
      { $set: { deletedAt: new Date() } },
    );

    const result = await FeedMessages.updateOne(
      { _id: comments.feedMessage },
      { $inc: { numberOfComments: -1 } },
    );

    const success = result.modifiedCount;
    if (success === 1) {
      return {
        message: 'Comment excluído com sucesso!',
        data: { commentId: commentId,
                feedMessage: comments.feedMessage,
        },
      };
    } else {
      return {
        error: 500,
        message: 'Comment NÃO foi excluído!',
        data: {},
      };
    }
  } catch (error) {
    let errorStatus: number | null;
    let errorMessage: string | null;
    if (error instanceof ErrorWithStatus) {
      errorStatus = error.getStatus();
      errorMessage = error.message;
    }
    return {
      error: errorStatus ?? 500,
      message: errorMessage ?? 'Erro ao excluir comment',
    };
  }
}
