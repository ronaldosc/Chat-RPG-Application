/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';
import { ICharater } from '../interface';

export async function addChatRoomPlayerId(param: ICharater) {
  try {

    await connectToMongoDB();

    const result = await ChatRooms.updateOne({ _id: param.chatRoomId, 'playerCharacters.characterId': param.playerCharacterId}, {$set: {"playerCharacters.$.player": param.playerId }});
    const success = result.modifiedCount;

    if (success === 1) {
      const chatRoom = await ChatRooms.find({ _id: param.chatRoomId });

      return {
        message: 'player alterado com sucesso!',
        data: {
          chatRoom,
        },
      };
    } else {
      return {
        error: 500,
        message: 'player NÃO foi alterado!',
        data: {},
      };
    }
  } catch (error) {
    let errorStatus: number | null;
    let errorMessage: string | null;
    if (error instanceof ErrorWithStatus) {
      errorStatus = error.getStatus();
      errorMessage = error.message;
    }
    return {
      error: errorStatus ?? 500,
      message: errorMessage ?? 'Erro ao alterar player',
    };
  }
}
