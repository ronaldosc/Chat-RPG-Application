import { IUser, PlayerCharacters } from '../users/interface';

export interface FeedMessagesModel {
  feedRoom: any /* FeedRoomsModel */;
  owner: IUser;
  title: string;
  content: string;
  image: string;
  numberOfPlayers: number;
  playerCharacters: Omit<PlayerCharacters, 'deletedAt'>[];
  numberOfComments: number;
  numberOfLikes: number;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}
