import { Request, Response } from 'express';

export function logout(req: Request, res: Response): void {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout realizado!', data: {} });
  return;
}
