import { Types } from 'mongoose';

export interface FeedMessageCommentsModel {
  feedMessage: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}
