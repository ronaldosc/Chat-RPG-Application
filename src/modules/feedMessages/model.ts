import mongoose, { Schema, SchemaTypeOptions, now } from 'mongoose';
import { FeedMessagesModel } from './interface';
require('dotenv').config();

const FeedMessagesSchema = new mongoose.Schema<SchemaTypeOptions<FeedMessagesModel>>({
  feedRoom: { type: Schema.Types.ObjectId, required: true },
  owner: { type: Schema.Types.ObjectId, required: true },
  title: { type: String },
  content: { type: String },
  image: { type: String },
  numberOfPlayers: { type: Number },
  playerCharacters: [
    {
      characterId: { type: Number },
      characterName: { type: String },
      player: { type: Schema.Types.ObjectId },
    },
  ],
  numberOfComments: { type: Number },
  numberOfLikes: { type: Number },
  createdAt: { type: Date, default: now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});

export const FeedMessages = mongoose.model('FeedMessages', FeedMessagesSchema);
