/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';

export async function getAvailableCharactersByChatRoomId(param: string) {
  try {
    await connectToMongoDB();

    const chatRoom = await ChatRooms.findOne({ _id: param });

    const notDeletedPlayerCharacters = chatRoom.playerCharacters.filter((element) => element.deletedAt ? false : true);

    const availablePlayerCharacters = notDeletedPlayerCharacters.filter((element) => element.player ? false : true);

    if (availablePlayerCharacters.length === 0) {
      throw new ErrorWithStatus('Não há personagens disponíveis para entrar nesse jogo no momento', 422);
    }

    return {
      message: 'Personagens disponíveis selecionados com sucesso!',
      data: {
        playerCharacters: availablePlayerCharacters,
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
      message: errorMessage ?? 'Erro ao selecionar personagens',
    };
  }
}
