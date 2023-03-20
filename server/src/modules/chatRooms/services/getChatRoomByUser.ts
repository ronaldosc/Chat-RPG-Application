import { Types } from 'mongoose';
import { connectToMongoDB } from '@config';
import { ChatRooms } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function getChatRoomByUserId(param: Types.ObjectId) {
  try {
    await connectToMongoDB();

    const chatRooms = await ChatRooms.find({
      $or: [{ owner: param }, { playerCharacters: { $elemMatch: { player: param } } }],
    });

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
