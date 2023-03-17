import mongoose, { Schema, now } from 'mongoose';
import { FeedMessageLikesModel } from './interface';

const FeedMessageLikesSchema = new mongoose.Schema<FeedMessageLikesModel>({
  feedMessage: { type: Schema.Types.ObjectId, required: true, ref: 'FeedMessage' },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: now, immutable: true },
});

export const FeedMessageLikes = mongoose.model('FeedMessageLikes', FeedMessageLikesSchema);
