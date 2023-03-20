import { connectToMongoDB } from '@config';
import { Err, ErrorWithStatus } from '@utils';
import { ChatFeedMessagesModel } from '@interfaces';
import { ChatFeedMessages } from '@models';

export async function create(param: Omit<ChatFeedMessagesModel, 'deletedAt' | 'createdAt'>) {
  const { numberOfComments, numberOfLikes, ...rest } = param;
  const newFeed = new ChatFeedMessages();

  try {
    await connectToMongoDB();

    Object.assign(newFeed, {
      numberOfComments: numberOfComments ?? 0,
      numberOfLikes: numberOfLikes ?? 0,
      ...rest,
    });

    await newFeed.save();

    return {
      message: 'Chat Feed adicionado com sucesso!',
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
      message: err.errorMessage ?? 'Erro ao adicionar chat feed',
    };
  }
}
