import mongoose, { Schema, now } from 'mongoose';
import { FeedMessagesModel } from './interface';

const FeedMessagesSchema = new mongoose.Schema<FeedMessagesModel>({
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  numberOfPlayers: { type: Number, required: true },
  playerCharacters: [
    {
      characterId: { type: [Number], index: { sparse: true } },
      characterName: { type: String },
      player: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  numberOfComments: { type: Number, required: true },
  numberOfLikes: { type: Number, required: true },
  createdAt: { type: Date, default: now, immutable: true },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});

export const FeedMessages = mongoose.model('FeedMessages', FeedMessagesSchema);
