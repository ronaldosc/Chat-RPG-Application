/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedMessageComments } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { FeedMessageCommentsModel } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { FeedMessages } from '../../feedMessages/model';
import { IUser } from '../../users/interface';

export async function create(param: FeedMessageCommentsModel) {
  try {
    await connectToMongoDB();

    const newComment = new FeedMessageComments();

    newComment.feedMessage = param.feedMessage;
    newComment.author = param.author;
    newComment.content = param.content;

    await newComment.save();

    await newComment.populate<{ author: Pick<IUser, 'contact'> }>('author', 'contact.userName' );

    const result = await FeedMessages.updateOne(
      { _id: { $eq: param.feedMessage } },
      { $inc: { numberOfComments: 1 } },
    );

    const success = result.modifiedCount;
    if (success !== 1) {
      throw new ErrorWithStatus('Comentário não foi inserido', 500);
    }

    return {
      message: 'Comentário inserido com sucesso!',
      data: {
        newComment,
      },
    };
  } catch (error) {
    let errorStatus: number | null;
    let errorMessage: string | null;
    if (error instanceof ErrorWithStatus) {
      errorStatus = error.getStatus();
      errorMessage = error.message;
    }
    return {
      error: errorStatus ?? 500,
      message: errorMessage ?? 'Erro ao adicionar comentário',
    };
  }
}
