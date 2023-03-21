import mongoose, { Schema, now } from 'mongoose';
import { ChatFeedMessagesModel } from './interface';

const ChatFeedMessagesSchema = new mongoose.Schema<ChatFeedMessagesModel>({
  chatRoomId: { type: Schema.Types.ObjectId, required: true, ref: 'ChatRooms' },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  directedTo: { type: Number },
  choices: [
    {
      choiceContent: { type: String },
      maxDiceValue: { type: Number },
      selected: { type: Boolean },
    },
  ],
  createdAt: { type: Date, default: now, immutable: true },
  deletedAt: { type: Date },
});

export const ChatFeedMessages = mongoose.model('ChatFeedMessages', ChatFeedMessagesSchema);
