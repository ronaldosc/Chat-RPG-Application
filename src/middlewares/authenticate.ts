import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

interface decodeData {
  userId: string;
}

function authenticate(req: Request, res: Response, next: NextFunction): any {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
  }

  if (process.env.JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as decodeData;
      (req as any).userId = decoded.userId;

      next();
    } catch (err: any) {
      return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
    }
  } else {
    return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
  }
}

export default authenticate;
