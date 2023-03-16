/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Types } from 'mongoose';
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';

export async function getChatRoomsListByUserId(param: Types.ObjectId) {
  try {
    await connectToMongoDB();

    const chatRooms = await ChatRooms.find({ $or: [ { owner: param }, { playerCharacters: { $elemMatch : { player : param } } } ] }, { title : 1, owner: 1 });

    return {
      message: 'Lista de chatRooms selecionada com sucesso!',
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
      message: errorMessage ?? 'Erro ao selecionar Lista de chatRoom(s)',
    };
  }
}
