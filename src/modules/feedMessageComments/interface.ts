import { FeedMessagesModel } from '../feedMessages/interface';
import { IUser } from '../users/interface';

export interface FeedMessageCommentsModel {
  feedMessage: FeedMessagesModel;
  author: IUser;
  content: string;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}
