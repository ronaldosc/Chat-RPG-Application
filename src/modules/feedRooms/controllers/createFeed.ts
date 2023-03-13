import { Request, Response } from 'express';
import { IFeedRoom } from '../interface';
import * as feedRoomServices from '../services';
import { webSocketInitializer } from '../../../index';

export async function createFeed(req: Request, res: Response): Promise<void> {
  const feedData: IFeedRoom = req.body;

  const result = await feedRoomServices.create(feedData);

  if (!result.error) {
    const newPost  = {
      "_id": result.data.newFeed._id,
      "playerCharacters": result.data.newFeed.playerCharacters,
      "createdAt": result.data.newFeed.createdAt,
      "feedRoom": result.data.newFeed.feedRoom,
      "owner": result.data.newFeed.owner,
      "title": result.data.newFeed.title,
      "content": result.data.newFeed.title,
      "image": result.data.newFeed.image,
      "numberOfPlayers": result.data.newFeed.numberOfPlayers,
      "numberOfComments": result.data.newFeed.numberOfComments,
      "numberOfLikes": result.data.newFeed.numberOfLikes
    }

    console.log(newPost);
    const userId: String = result.data.newFeed.owner;

    webSocketInitializer.redisPub.publish('feedRoom', JSON.stringify(newPost));

    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
