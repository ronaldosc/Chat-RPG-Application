import { FeedMessageLikesModel } from '@interfaces';
import { connectToMongoDB } from '@config';
import { FeedMessageLikes } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function dislike(param: FeedMessageLikesModel) {
  const { feedMessage, author } = param;
  const removeLike = FeedMessageLikes.findOneAndDelete({ feedMessage, author });

  try {
    await connectToMongoDB();

    return {
      message: 'Dislike realizado com sucesso!',
      data: {
        removeLike,
      },
    };
  } catch (error: unknown) {
    let err: Err;
    if (error instanceof ErrorWithStatus) {
      err = { errorStatus: error.getStatus(), errorMessage: error.message };
    }
    return {
      error: err.errorStatus ?? 500,
      message: err.errorMessage ?? 'Erro ao adicionar feed',
    };
  }
}
