/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedMessageComments } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { FeedMessageCommentsModel } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { FeedMessages } from '../../feedMessages/model';

export async function create(param: FeedMessageCommentsModel) {
  try {
    await connectToMongoDB();

    const newComment = new FeedMessageComments();

    newComment.feedMessage = param.feedMessage;
    newComment.author = param.author;
    newComment.content = param.content;

    await newComment.save();

    const result = await FeedMessages.updateOne(
      { _id: param.feedMessage },
      { $inc: { numberOfComments: 1 } },
    );

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
  } catch (error) {
    let errorStatus: number | null;
    let errorMessage: string | null;
    if (error instanceof ErrorWithStatus) {
      errorStatus = error.getStatus();
      errorMessage = error.message;
    }
    return {
      error: errorStatus ?? 500,
      message: errorMessage ?? 'Erro ao adicionar comment',
    };
  }
}
