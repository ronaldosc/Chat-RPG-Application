import { Types } from 'mongoose';

export interface ChatFeedMessagesModel {
  chatRoomId: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  directedTo?: number;
  choices?: Array<Choices>;
  createdAt: Date;
  deletedAt?: Date;
  characterName?: string;
}

export interface Choices {
  choiceContent: string;
  maxDiceValue: number;
  selected?: boolean;
}
