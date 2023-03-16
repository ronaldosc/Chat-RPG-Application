import { Request, Response } from 'express';
import { getChatRoom, getChatRoomByOwnerId } from '../services';

export async function getChatRoomByOwner(req: Request, res: Response): Promise<void> {
  const ownerId = req.params.ownerId;

  const chatRooms = await getChatRoomByOwnerId(ownerId);

  if (!chatRooms.error) {

    res.status(200).json(chatRooms);
    return;
  }

  res.status(chatRooms.error).json(chatRooms.message);
  return;
}
