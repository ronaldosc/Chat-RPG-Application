/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedMessages } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { IUser } from '../../users/interface';

export async function getFeeds() {
  try {
    await connectToMongoDB();
    const documents = await FeedMessages.find().sort({ _id: -1 }).populate<{ owner: Pick<IUser, 'contact'> }>('owner', 'contact.userName' );

    return {
      message: 'Sucesso! Retornado todos os feeds ordenados cronologicamente',
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
