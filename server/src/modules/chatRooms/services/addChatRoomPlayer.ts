/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';
import { ICharacter } from '../interface';
import { FeedMessages } from '../../feedMessages/model';
import { User } from '../../users/model';

export async function addChatRoomPlayerId(param: ICharacter) {
  try {
    await connectToMongoDB();

    const userAlreadyExists = await User.findOne({ _id: { $eq: param.playerId } }).exec();

    if (!userAlreadyExists) {
      throw new ErrorWithStatus('Usuário com esse ID não existe.', 400);
    }

    if (typeof param.chatRoomId !== 'string' || typeof param.playerCharacterId !== 'string') {
      throw new ErrorWithStatus('Invalid chat room or character ID format.', 400);
    }
    
    const resultChat = await ChatRooms.findOne({
      _id: { $eq: param.chatRoomId },
      'playerCharacters.characterId': { $eq: param.playerCharacterId },
    });

    for (let i = 0; i < resultChat.playerCharacters.length; i++) {
      if (
        resultChat.playerCharacters[i].characterId == param.playerCharacterId &&
        !resultChat.playerCharacters[i].deletedAt
      ) {
        if (resultChat.playerCharacters[i].player) {
          throw new ErrorWithStatus('Já existe um usuário para esse personagem', 422);
        } else {
          resultChat.playerCharacters[i].player = param.playerId;
        }
      }
    }

    resultChat.save();

    const resultFeed = await FeedMessages.updateOne(
      { _id: resultChat.feedMessageOrigin },
      { $set: { playerCharacters: resultChat.playerCharacters } },
    );

    if (resultFeed.modifiedCount !== 1) {
      throw new ErrorWithStatus('Jogador não foi adicionado!', 500);
    }

    return {
      message: 'Jogador alterado com sucesso!',
      data: {
        resultChat,
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
      message: errorMessage ?? 'Erro ao adicionar jogador',
    };
  }
}
