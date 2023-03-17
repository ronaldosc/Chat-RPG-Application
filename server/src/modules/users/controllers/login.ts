import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ILoginUser } from '../interface';
import * as userServices from '../services';

export async function login(req: Request, res: Response): Promise<void> {
  const loginData: ILoginUser = req.body;

  const result = await userServices.login(loginData);

  if (!result.error) {
    const { _id } = result.data;

    const alreadyHasToken = req.cookies.token;

    if (alreadyHasToken) {
      res.clearCookie('token');
    }

    if (process.env.JWT_SECRET) {
      const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });

      res.cookie('token', token, { httpOnly: true });

      res.status(200).json(token);
      return;
    }
  }

  res.status(result.error).json(result.message);
  return;
}
