/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connectToMongoDB } from '../../../config/mongodb';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { ChatFeedMessages } from '../model';

export async function getChatFeedMessagesByChatId(param: String) {
  try {
    await connectToMongoDB();

    const chatMessage = await ChatFeedMessages.find({ chatRoomId: param });

    return {
      message: 'Chat Feed(s) selecionado(s) com sucesso!',
      data: {
        chatMessage,
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
      message: errorMessage ?? 'Erro ao selecionar Chat Feed Messages',
    };
  }
}
