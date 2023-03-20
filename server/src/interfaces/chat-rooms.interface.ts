import { PlayerCharacters } from './users.interface';
import { Types } from 'mongoose';

export interface ChatRoomsModel {
  feedMessageOrigin: Types.ObjectId;
  owner: Types.ObjectId;
  title: string;
  description: string;
  image?: string;
  numberOfPlayers: number;
  playerCharacters: Omit<PlayerCharacters, 'deletedAt'>[];
  waitingForResponse: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICharacter {
  chatRoomId: Types.ObjectId;
  playerCharacterId: number;
  playerId: Types.ObjectId;
}
