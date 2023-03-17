import { Types } from 'mongoose';

export interface ChatFeedMessagesModel {
  chatRoomId: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  image?: string;
  directedTo?: number;
  choices?: Array<Choices>;
  numberOfComments: number;
  numberOfLikes: number;
  createdAt: Date;
  deletedAt?: Date;
}

export interface Choices {
  choiceContent: string;
  maxDiceValue: number;
  selected?: boolean;
}