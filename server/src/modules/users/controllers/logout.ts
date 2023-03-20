import { Request, Response } from 'express';

export function logout(_req: Request, { clearCookie, status }: Response): void {
  clearCookie('token');
  status(200).json({ message: 'Logout realizado!', data: {} });
  return;
}
