import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { DecodeDataModel } from '@interfaces';
import { Env } from '@env';

export function authenticate(req: Request, res: Response, next: NextFunction): any {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
  }

  if (Env('JWT_SECRET')) {
    try {
      const decoded = verify(token, Env('JWT_SECRET')) as DecodeDataModel;
      (req as any).userId = decoded.userId;

      next();
    } catch (err: any) {
      return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
    }
  } else {
    return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
  }
}
