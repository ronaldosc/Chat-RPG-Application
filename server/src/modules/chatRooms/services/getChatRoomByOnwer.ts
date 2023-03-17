/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';

export async function getChatRoomByOwnerId(param: string) {
  try {
    await connectToMongoDB();

    const chatRooms = await ChatRooms.find({ owner: param });

    return {
      message: 'chatRoom(s) selecionado(s) com sucesso!',
      data: {
        chatRooms,
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
      message: errorMessage ?? 'Erro ao selecionar chatRoom(s)',
    };
  }
}
