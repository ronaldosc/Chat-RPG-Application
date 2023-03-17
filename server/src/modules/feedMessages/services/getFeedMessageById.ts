/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { FeedMessages } from '../model';

export async function getFeedMessage(param: String) {
  try {
    await connectToMongoDB();

    console.log(param);
    const feedMessage = await FeedMessages.find({ _id: param });

    return {
      message: 'Feed selecionado com sucesso!',
      data: {
        feedMessage,
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
      message: errorMessage ?? 'Erro ao selecionar feedMessage',
    };
  }
}
