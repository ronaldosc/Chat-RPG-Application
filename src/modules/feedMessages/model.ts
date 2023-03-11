import { Schema, SchemaTypeOptions, model, now } from 'mongoose';
import { FeedMessagesModel } from './interface';

const FeedMessagesSchema = new Schema<SchemaTypeOptions<FeedMessagesModel>>({
  feedRoom: { type: Schema.Types.ObjectId, required: true, ref: 'FeedRoom' },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'Owner' },
  title: { type: String },
  content: { type: String },
  image: { type: String },
  numberOfPlayers: { type: Number },
  playerCharacters: [
    {
      characterId: { type: [Number], index: { sparse: true } },
      characterName: { type: String },
      player: { type: Schema.Types.ObjectId, ref: 'Player' },
    },
  ],
  numberOfComments: { type: Number },
  numberOfLikes: { type: Number },
  createdAt: { type: Date, default: now, immutable: true },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export const FeedMessages = model('FeedMessages', FeedMessagesSchema);
