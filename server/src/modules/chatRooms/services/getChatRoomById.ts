import { connectToMongoDB } from '@config';
import { ChatRooms } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function getChatRoom(param: string) {
  try {
    await connectToMongoDB();

    const chatRoom = await ChatRooms.find({ _id: param });

    return {
      message: 'Sala do chat selecionada com sucesso!',
      data: {
        chatRoom,
      },
    };
  } catch (error: unknown) {
    let err: Err;
    if (error instanceof ErrorWithStatus) {
      err = { errorStatus: error.getStatus(), errorMessage: error.message };
    }
    return {
      error: err.errorStatus ?? 500,
      message: err.errorMessage ?? 'Erro ao selecionar sala do chat',
    };
  }
}
