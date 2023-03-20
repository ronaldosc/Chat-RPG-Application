import { ICharacter } from '@interfaces';
import { connectToMongoDB } from '@config';
import { ChatRooms } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function addChatRoomPlayerId(param: ICharacter) {
  const { chatRoomId, playerCharacterId, playerId } = param;

  try {
    await connectToMongoDB();

    const result = await ChatRooms.updateOne(
      { _id: chatRoomId, 'playerCharacters.characterId': playerCharacterId },
      { $set: { 'playerCharacters.$.player': playerId } },
    );
    const success = result.modifiedCount;

    if (success === 1) {
      const chatRoom = await ChatRooms.find({ _id: chatRoomId });

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
  } catch (error: unknown) {
    let err: Err;
    if (error instanceof ErrorWithStatus) {
      err = { errorStatus: error.getStatus(), errorMessage: error.message };
    }
    return {
      error: err.errorStatus ?? 500,
      message: err.errorMessage ?? 'Erro ao alterar player',
    };
  }
}
