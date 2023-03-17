/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedMessageLikes } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { FeedMessageLikesModel } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';

export async function like(param: FeedMessageLikesModel) {
  try {
    await connectToMongoDB();

    const newLike = new FeedMessageLikes();

    newLike.feedMessage = param.feedMessage;
    newLike.author = param.author;

    await newLike.save();

    return {
      message: 'Like realizado com sucesso!',
      data: {
        newLike,
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
      message: errorMessage ?? 'Erro ao adicionar feed',
    };
  }
}
