import { FeedMessagesModel } from '@interfaces';
import { connectToMongoDB } from '@config';
import { FeedMessages } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function create(param: Omit<FeedMessagesModel, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
  const newFeed = new FeedMessages();

  try {
    await connectToMongoDB();
    Object.assign(newFeed, {
      ...param,
      numberOfComments: param.numberOfComments ?? 0,
      numberOfLikes: param.numberOfLikes ?? 0,
    });

    await newFeed.save();

    return {
      message: 'Feed adicionado com sucesso!',
      data: {
        newFeed,
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
