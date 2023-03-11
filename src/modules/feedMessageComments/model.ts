import { Schema, SchemaTypeOptions, model, now } from 'mongoose';
import { FeedMessageCommentsModel } from './interface';

const FeedMessageCommentsSchema = new Schema<SchemaTypeOptions<FeedMessageCommentsModel>>({
  feedMessage: { type: Schema.Types.ObjectId, required: true, ref: 'FeedMessage' },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
  content: { type: String },
  createdAt: { type: Date, default: now, immutable: true },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export const FeedMessagesComments = model('FeedMessageComments', FeedMessageCommentsSchema);
