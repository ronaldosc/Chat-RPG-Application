import { Err } from '@utils';
import { connectToMongoDB } from '@config';
import { ErrorWithStatus } from '@utils';
import { ChatRooms } from '@models';

export async function getChatRoomIdByFeedId(param: string) {
  try {
    await connectToMongoDB();

    const chat = await ChatRooms.find({ feedMessageOrigin: param }, { _id: 1, title: 1, owner: 1 });

    return {
      message: 'Sala de chat selecionada com sucesso!',
      data: {
        chat,
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
