/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Types } from 'mongoose';
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';

export async function getChatRoomByIdAndUserId(chatRoomId: Types.ObjectId, userId: Types.ObjectId) {
  try {
    await connectToMongoDB();

    const chatRoom = await ChatRooms.find({$and: [{ _id: chatRoomId }, {
      $or: [{ owner: userId }, { playerCharacters: { $elemMatch: { player: userId } } }] }]},
      { title: 1, owner: 1 }
    );

    return {
      message: 'Sala de chat selecionada com sucesso!',
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
      message: errorMessage ?? 'Erro ao selecionar sala de chat',
    };
  }
}
