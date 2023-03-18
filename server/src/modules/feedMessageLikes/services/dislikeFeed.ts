/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedMessageLikes } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { FeedMessageLikesModel } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';

export async function dislike(param: FeedMessageLikesModel) {
  try {
    await connectToMongoDB();

    const removeLike = FeedMessageLikes.findOneAndDelete({ feedMessage: param.feedMessage, author: param.author });

    return {
      message: 'Dislike realizado com sucesso!',
      data: {
        removeLike,
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
