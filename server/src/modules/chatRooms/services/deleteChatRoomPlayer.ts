/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';
import { ICharacter } from '../interface';
import { FeedMessages } from '../../feedMessages/model';
import { Types } from 'mongoose';

export async function deleteChatRoomPlayerId(param: ICharacter, owner: Types.ObjectId) {
  try {
    await connectToMongoDB();

    const resultChat = await ChatRooms.findOneAndUpdate({ _id: param.chatRoomId, 'playerCharacters.characterId': param.playerCharacterId });

    if (resultChat.owner !== owner) {
      throw new ErrorWithStatus('Você não pode excluir um jogador pois não é o dono da sala!', 403)
    }

    for (let i = 0; i < resultChat.playerCharacters.length; i++) {
      if (resultChat.playerCharacters[i].characterId == param.playerCharacterId && !resultChat.playerCharacters[i].deletedAt) {
        resultChat.playerCharacters[i].player = undefined;
      }
    }

    resultChat.save();

    const resultFeed = await FeedMessages.updateOne(
      { _id : resultChat.feedMessageOrigin } ,
      { $set: { playerCharacters: resultChat.playerCharacters } }
    );

    if (resultFeed.modifiedCount !== 1) {
      throw new ErrorWithStatus('Jogador não foi excluído!', 500);
    }

    return {
      message: 'Jogador excluído com sucesso!',
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
      message: errorMessage ?? 'Erro ao excluir jogador',
    };
  }
}
