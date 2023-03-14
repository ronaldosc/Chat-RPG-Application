import { Request } from 'express';
import { Types } from 'mongoose';

export interface AuthenticatedUserDataRequest extends Request {
  userId: Types.ObjectId;
}
