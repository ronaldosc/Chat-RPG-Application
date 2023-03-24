/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Types } from 'mongoose';
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';

export async function getChatRoomByIdAndUserId(chatRoomId: Types.ObjectId, userId: Types.ObjectId) {
  try {
    await connectToMongoDB();

    const chatRoom = await ChatRooms.find({$and: [{ _id: chatRoomId }, {
      $or: [{ owner: userId },
            { playerCharacters: { $elemMatch: { player: userId } } },
            { playerCharacters: { $elemMatch: { deletedAt: null } } }
           ]}]},
      { title: 1, owner: 1, playerCharacters: 1 }
    );

    if (chatRoom.length > 0){
      if (userId == chatRoom[0].owner){
        chatRoom[0].title = 'Mestre da Sala';
      } else {
          for (let i = 0; i < chatRoom[0].playerCharacters.length; i++) {
            if (chatRoom[0].playerCharacters[i].player == userId) {
              chatRoom[0].title = chatRoom[0].playerCharacters[i].characterName;
            }
          }
      }
    }

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
