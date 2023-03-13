import mongoose from 'mongoose';
import { IFeedRoom } from './interface';

const FeedRoomSchema = new mongoose.Schema<IFeedRoom>({
  feedRoom: { type: Number, required: true },
  owner: { type: String, required: true },
  title:  { type: String, required: true },
  content:  { type: String, required: true },
  image: { type: String },
  numberOfPlayers: { type: Number },
  playerCharacters: [{characterId: Number, characterName: String, player: Number}] ,
  numberOfComments: { type: Number },
  numberOfLikes: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});

const FeedRoomPost = mongoose.model<IFeedRoom>('FeedRoom', FeedRoomSchema);

export default FeedRoomPost;