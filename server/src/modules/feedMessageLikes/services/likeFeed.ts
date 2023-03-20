import { FeedMessageLikesModel } from '@interfaces';
import { connectToMongoDB } from '@config';
import { FeedMessageLikes } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function like(param: FeedMessageLikesModel) {
  const addLike = new FeedMessageLikes();
  const { feedMessage, author } = param;

  try {
    await connectToMongoDB();
    Object.assign(addLike, { feedMessage, author });

    await addLike.save();

    return {
      message: 'Like realizado com sucesso!',
      data: {
        addLike,
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
