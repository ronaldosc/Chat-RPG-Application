export interface IUser {
  email: string;
  password: string;
  contact: {
    userName: string;
    firstName?: string;
    lastName?: string;
    profilePhoto?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
