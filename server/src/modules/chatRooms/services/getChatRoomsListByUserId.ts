import { connectToMongoDB } from '@config';
import { Err, ErrorWithStatus } from '@utils';
import { ChatRooms } from '@models';

export async function getChatRoomsListByUserId(param: string) {
  try {
    await connectToMongoDB();

    const chatRooms = await ChatRooms.find(
      { $or: [{ owner: param }, { playerCharacters: { $elemMatch: { player: param } } }] },
      { title: 1, owner: 1 },
    );

    return {
      message: 'Lista de chatRooms selecionada com sucesso!',
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
      message: err.errorMessage ?? 'Erro ao selecionar Lista de chatRoom(s)',
    };
  }
}