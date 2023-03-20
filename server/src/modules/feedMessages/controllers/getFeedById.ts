import { Request, Response } from 'express';
import * as feedRoomServices from '../services';

export async function getFeedById(req: Request, res: Response): Promise<void> {
  const { feedId } = req.params;

  const result = await feedRoomServices.getFeedMessage(feedId);

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
