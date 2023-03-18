/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatRooms } from '../model';

export async function getChatRoomIdByFeedId(param: string) {
  try {
    await connectToMongoDB();

    const chat = await ChatRooms.find({ feedMessageOrigin: param },
                                      { _id: 1, title: 1, owner: 1 });

    return {
      message: 'chatRoom selecionado com sucesso!',
      data: {
        chat,
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
      message: errorMessage ?? 'Erro ao selecionar chatRoom',
    };
  }
}
