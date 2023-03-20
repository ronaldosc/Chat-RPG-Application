import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { ILoginUser } from '@interfaces';
import { login } from '@services/users';
import { Env } from '@env';

export async function loginAuth({ body, cookies }: Request, { cookie, clearCookie, status }: Response): Promise<void> {
  const {
    data: { _id },
    error,
    message,
  } = await login(<ILoginUser>body);

  if (!error) {
    if (cookies.token) {
      clearCookie('token');
    }

    if (Env('JWT_SECRET')) {
      const token = sign({ userId: _id }, Env('JWT_SECRET'), {
        expiresIn: Env('JWT_EXPIRATION_TIME'),
      });

      cookie('token', token, { httpOnly: true });
      status(200).json(token);

      return;
    }
  }
  status(error).json(message);

  return;
}
