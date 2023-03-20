import mongoose, { Schema, now } from 'mongoose';
import { FeedMessageCommentsModel } from '@interfaces';

const FeedMessageCommentsSchema = new mongoose.Schema<FeedMessageCommentsModel>({
  feedMessage: { type: Schema.Types.ObjectId, required: true, ref: 'FeedMessages' },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String },
  createdAt: { type: Date, default: now, immutable: true },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export const FeedMessageComments = mongoose.model('FeedMessageComments', FeedMessageCommentsSchema);
