/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { FeedMessageComments } from '../../feedMessageComments/model';
import { FeedMessageLikes } from '../../feedMessageLikes/model';
import { FeedMessages } from '../model';

export async function getFeedMessage(param: string) {
  try {
    await connectToMongoDB();
    const feedMessage = await FeedMessages.find({ _id: param }).exec();

    const comments = await FeedMessageComments.find({ feedMessage: param }).exec();

    const likes = await FeedMessageLikes.find({ feedMessage: param }).exec();

    if (feedMessage.length===0) {
      return {
        error: 500,
        message: 'Feed de oringem não encontrado!',
      };
    } else {
      return {
        message: 'Feed selecionado com sucesso!',
        data: {
          feedMessage,
          comments,
          likes,
        },
      }
    }

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
