/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ChatRoomsModel } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';

export async function create(param: ChatRoomsModel) {
  try {
    await connectToMongoDB();

    const newChatRoom = new ChatRooms();

    newChatRoom.feedMessageOrigin = param.feedMessageOrigin;
    newChatRoom.owner = param.owner;
    newChatRoom.title = param.title;
    newChatRoom.content = param.content;
    newChatRoom.image = param.image;
    newChatRoom.numberOfPlayers = param.numberOfPlayers;
    newChatRoom.playerCharacters = param.playerCharacters;

    await newChatRoom.save();

    return {
      message: 'Chat Room adicionado com sucesso!',
      data: {
        newChatRoom,
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
      message: errorMessage ?? 'Erro ao adicionar chat Room',
    };
  }
}
