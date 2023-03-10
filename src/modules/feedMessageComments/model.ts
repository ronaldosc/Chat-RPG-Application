import mongoose, { Schema, SchemaTypeOptions, now } from 'mongoose';
import { FeedMessageCommentsModel } from './interface';
require('dotenv').config();

const FeedMessageCommentsSchema = new mongoose.Schema<SchemaTypeOptions<FeedMessageCommentsModel>>({
  feedMessage: { type: Schema.Types.ObjectId, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
  content: { type: String },
  createdAt: { type: Date, default: now },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export const FeedMessagesComments = mongoose.model('FeedMessageComments', FeedMessageCommentsSchema);
