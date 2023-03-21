/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChatFeedMessages } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { ChatFeedMessagesModel } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';

export async function create(param: ChatFeedMessagesModel) {
  try {
    await connectToMongoDB();

    const newFeed = new ChatFeedMessages();

    newFeed.chatRoomId = param.chatRoomId;
    newFeed.author = param.author;
    newFeed.content = param.content;
    newFeed.directedTo = param.directedTo;
    newFeed.choices = param.choices;

    await newFeed.save();

    return {
      message: 'Chat Feed adicionado com sucesso!',
      data: {
        newFeed,
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
      message: errorMessage ?? 'Erro ao adicionar chat feed',
    };
  }
}
