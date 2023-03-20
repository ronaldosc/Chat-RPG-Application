import { connectToMongoDB } from '@config';
import { FeedMessages } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function get() {
  const documents = await FeedMessages.find().sort({ _id: -1 });

  try {
    await connectToMongoDB();

    return {
      message: 'Sucesso! Retornado todos os feeds ordenados cronologicamente',
      data: {
        feeds: documents,
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
