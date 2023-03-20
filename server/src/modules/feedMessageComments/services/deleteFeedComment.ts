import { Types } from 'mongoose';
import { connectToMongoDB } from '@config';
import { FeedMessageComments } from '@models';
import { FeedMessages } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function deleteComment(author: Types.ObjectId, commentId: Types.ObjectId) {
  const comments = await FeedMessageComments.findOne({ _id: commentId, deletedAt: null });

  try {
    await connectToMongoDB();

    if (comments.author !== author) {
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

    const result = await FeedMessages.updateOne({ _id: comments.feedMessage }, { $inc: { numberOfComments: -1 } });

    const success = result.modifiedCount;
    if (success === 1) {
      return {
        message: 'Comment excluído com sucesso!',
        data: { commentId: commentId, feedMessage: comments.feedMessage },
      };
    } else {
      return {
        error: 500,
        message: 'Comment NÃO foi excluído!',
        data: {},
      };
    }
  } catch (error: unknown) {
    let err: Err;
    if (error instanceof ErrorWithStatus) {
      err = { errorStatus: error.getStatus(), errorMessage: error.message };
    }
    return {
      error: err.errorStatus ?? 500,
      message: err.errorMessage ?? 'Erro ao excluir comment',
    };
  }
}
