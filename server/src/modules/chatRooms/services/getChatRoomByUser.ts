/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Types } from 'mongoose';
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';

export async function getChatRoomByUserId(param: Types.ObjectId) {
  try {
    await connectToMongoDB();

    const chatRooms = await ChatRooms.find({
      $or: [{ owner: param }, { playerCharacters: { $elemMatch: { player: param } } }],
    });

    return {
      message: 'Sala(s) de chat selecionada(s) com sucesso!',
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
      message: errorMessage ?? 'Erro ao selecionar salas(s) de chat',
    };
  }
}
