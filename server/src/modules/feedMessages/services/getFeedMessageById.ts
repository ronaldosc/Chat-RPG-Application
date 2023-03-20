import { connectToMongoDB } from '@config';
import { FeedMessages } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function getFeedMessage(param: string) {
  const feedMessage = await FeedMessages.find({ _id: param });

  try {
    await connectToMongoDB();
    const feedMessage = await FeedMessages.find({ _id: param }).exec();

    if (feedMessage.length === 0) {
      return {
        error: 500,
        message: 'Feed de origem não encontrado!',
      };
    } else {
      return {
        message: 'Feed selecionado com sucesso!',
        data: {
          feedMessage,
        },
      };
    }
  } catch (error) {
    let errorStatus: number | null;
    let errorMessage: string | null;
    if (error instanceof ErrorWithStatus) {
      err = { errorStatus: error.getStatus(), errorMessage: error.message };
    }
    return {
      error: err.errorStatus ?? 500,
      message: err.errorMessage ?? 'Erro ao selecionar feedMessage',
    };
  }
}
