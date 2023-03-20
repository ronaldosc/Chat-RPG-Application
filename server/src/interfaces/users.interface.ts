import { Types } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  contact: {
    userName: string;
    firstName?: string;
    lastName?: string;
    profilePhoto?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  setPassword?: (password: string) => void;
  validPassword?: (password: string) => boolean;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface PlayerCharacters {
  characterId: number;
  characterName: string;
  player: Types.ObjectId | undefined;
  deletedAt?: Date | undefined;
}
