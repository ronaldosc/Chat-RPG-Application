import mongoose, { Schema, SchemaTypeOptions, now } from 'mongoose';
import { FeedMessageLikesModel } from '../interface';
require('dotenv').config();

const FeedMessageLikesSchema = new mongoose.Schema<SchemaTypeOptions<FeedMessageLikesModel>>({
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

export const FeedMessageLikes = mongoose.model('FeedMessageLikes', FeedMessageLikesSchema);
