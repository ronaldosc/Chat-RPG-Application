import { Request, Response } from 'express';
import { IUser } from '../interface';
import { create } from '../services';

export async function createUser(req: Request, res: Response): Promise<void> {
  const userData: IUser = req.body;

  const result = await create(userData);

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
