import { UserModel } from './user.model';

export interface BlockingStatusModel {
  id: string;

  blocked_user: UserModel | null;

  blocking_users: UserModel[];
}
