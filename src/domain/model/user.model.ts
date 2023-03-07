import { UserContactModel } from './user-contact.model';

export type ProtoUser = {
  id: string;
  email: string;
  contact: UserContactModel;
};

export interface UserModel extends ProtoUser {
  password: string;

  // followers: UserBaseType[];
  // following: UserBaseType[];
  // blocked_users: UserBaseType[];
  // player_code: string;
}
