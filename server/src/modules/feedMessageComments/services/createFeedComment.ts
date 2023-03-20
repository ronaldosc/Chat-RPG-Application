import { FeedMessageCommentsModel } from '@interfaces';
import { connectToMongoDB } from '@config';
import { FeedMessageComments } from '@models';
import { FeedMessages } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function create(param: FeedMessageCommentsModel) {
  const { feedMessage, author, content } = param;
  const newComment = new FeedMessageComments();

  try {
    await connectToMongoDB();
    Object.assign(newComment, {
      feedMessage,
      author,
      content,
    });

    await newComment.save();

    const result = await FeedMessages.updateOne({ _id: param.feedMessage }, { $inc: { numberOfComments: 1 } });

    const success = result.modifiedCount;
    if (success === 1) {
      return {
        message: 'Comment inserido com sucesso!',
        data: {
          newComment,
        },
      };
    } else {
      return {
        error: 500,
        message: 'Comment NÃO foi inserido!',
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
      message: err.errorMessage ?? 'Erro ao adicionar comment',
    };
  }
}
