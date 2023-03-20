import { ChatRoomsModel } from '@interfaces';
import { connectToMongoDB } from '@config';
import { ChatRooms } from '@models';
import { Err, ErrorWithStatus } from '@utils';

export async function create(
  param: Omit<ChatRoomsModel, 'waitingForResponse' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
) {
  const newChatRoom = new ChatRooms();

  try {
    await connectToMongoDB();

    Object.assign(newChatRoom, { ...param });

    await newChatRoom.save();

    return {
      message: 'Sala de Chat adicionada com sucesso!',
      data: {
        newChatRoom,
      },
    };
  } catch (error: unknown) {
    let err: Err;
    if (error instanceof ErrorWithStatus) {
      err = { errorStatus: error.getStatus(), errorMessage: error.message };
    }
    return {
      error: err.errorStatus ?? 500,
      message: err.errorMessage ?? 'Erro ao adicionar chat Room',
    };
  }
}
