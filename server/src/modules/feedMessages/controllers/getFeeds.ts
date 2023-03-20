import { Request, Response } from 'express';
import { get } from '@services/feedMessages';

export async function getFeeds(_req: Request, { status }: Response): Promise<void> {
  const result = await get();

  if (!result.error) {
    status(200).json(result);
    return;
  }

  status(result.error).json(result.message);
  return;
}
