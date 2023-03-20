import { Types } from 'mongoose';

export interface FeedMessageLikesModel {
  feedMessage: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
}
