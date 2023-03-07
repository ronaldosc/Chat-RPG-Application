import { Request } from 'express';

export interface AuthenticatedUserDataRequest extends Request {
  userId: string;
}
