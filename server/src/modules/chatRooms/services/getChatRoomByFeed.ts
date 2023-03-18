/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';

export async function getChatRoomByFeedId(param: string) {
  try {
    await connectToMongoDB();

    const chatRoom = await ChatRooms.findOne({ feedMessageOrigin: param }).exec();

    return {
      message: 'chatRoom selecionado com sucesso!',
      data: {
        chatRoom,
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
      message: errorMessage ?? 'Erro ao selecionar chatRoom',
    };
  }
}
