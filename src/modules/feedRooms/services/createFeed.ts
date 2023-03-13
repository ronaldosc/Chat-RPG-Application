/* eslint-disable @typescript-eslint/explicit-function-return-type */
import FeedRoomPost from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { IFeedRoom } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';

export async function create(param: IFeedRoom) {
  try {
    await connectToMongoDB();

    const newFeed = new FeedRoomPost();

    newFeed.feedRoom = param.feedRoom;
    newFeed.owner = param.owner;
    newFeed.title = param.title;
    newFeed.content = param.content;
    newFeed.image = param.image;
    newFeed.numberOfPlayers = 0;
    newFeed.playerCharacters = param.playerCharacters;
    newFeed.numberOfComments = 0;
    newFeed.numberOfLikes = 0;

    await newFeed.save();

    return {
      message: 'Feed adicionado com sucesso!',
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
      message: errorMessage ?? 'Erro ao adicionar feed',
    };
  }
}
