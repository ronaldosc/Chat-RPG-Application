import { Request, Response } from 'express';
import { IUser } from '@interfaces';
import { create } from '@services/users';

export async function createUser({ body }: Request, { status }: Response): Promise<void> {
  const result = await create(<IUser>body);

  if (!result.error) {
    status(200).json(result);
    return;
  }

  status(result.error).json(result.message);
  return;
}
