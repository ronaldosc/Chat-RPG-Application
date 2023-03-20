import { connectToMongoDB } from '@config';
import { ChatRooms } from '@models';
import { Err, ErrorWithStatus } from '@utils';

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
  } catch (error: unknown) {
    let err: Err;
    if (error instanceof ErrorWithStatus) {
      err = { errorStatus: error.getStatus(), errorMessage: error.message };
    }
    return {
      error: err.errorStatus ?? 500,
      message: err.errorMessage ?? 'Erro ao selecionar chatRoom(s)',
    };
  }
}
