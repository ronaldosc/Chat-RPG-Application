import { Types } from 'mongoose';
import { PlayerCharacters } from '../users/interface';

export interface FeedMessagesModel {
  owner: Types.ObjectId;
  title: string;
  content: string;
  image?: string;
  numberOfPlayers: number;
  playerCharacters: Omit<PlayerCharacters, 'deletedAt'>[];
  numberOfComments: number;
  numberOfLikes: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
