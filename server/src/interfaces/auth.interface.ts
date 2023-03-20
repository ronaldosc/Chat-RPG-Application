import { Request } from 'express';
import { Types } from 'mongoose';

export interface AuthenticatedUserDataRequestModel extends Request {
  userId: Types.ObjectId;
}
export interface DecodeDataModel {
  userId: string;
}
