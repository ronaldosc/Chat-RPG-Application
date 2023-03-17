/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedMessages } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';

export async function getFeeds() {
  try {
    await connectToMongoDB();
    const documents = await FeedMessages.find().sort({ _id: -1 }).limit(10);

    return {
      message: 'Sucesso! Retornado 10 últimos feeds',
      data: {
        feeds: documents,
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
