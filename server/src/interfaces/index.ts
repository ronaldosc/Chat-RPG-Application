import { Request } from 'express';
import { Types } from 'mongoose';

export interface AuthenticatedUserDataRequest extends Request {
  userId: Types.ObjectId;
}
export interface DecodeData {
  userId: string;
}
