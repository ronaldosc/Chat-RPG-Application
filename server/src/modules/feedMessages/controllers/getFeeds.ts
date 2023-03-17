import { Request, Response } from 'express';
import * as feedRoomServices from '../services';

export async function getFeeds(req: Request, res: Response): Promise<void> {
  const result = await feedRoomServices.getFeeds();

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
