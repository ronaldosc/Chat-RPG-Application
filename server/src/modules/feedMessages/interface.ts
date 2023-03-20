import { Types } from 'mongoose';
import { PlayerCharacters } from '../users/interface';

export interface FeedMessagesModel {
  owner: Types.ObjectId;
  title: string;
  content: string;
  image?: string;
  numberOfPlayers: number;
  playerCharacters: PlayerCharacters[];
  numberOfComments: number;
  numberOfLikes: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
