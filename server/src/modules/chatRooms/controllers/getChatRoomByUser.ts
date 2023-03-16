import { Request, Response } from 'express';
import { getChatRoomByUserId } from '../services';
import { AuthenticatedUserDataRequest } from '../../../interfaces';

export async function getChatRoomByUser(req: Request, res: Response): Promise<void> {

  const user = (req as AuthenticatedUserDataRequest).userId

  const chatRooms = await getChatRoomByUserId(user);

  if (!chatRooms.error) {

    res.status(200).json(chatRooms);
    return;
  }

  res.status(chatRooms.error).json(chatRooms.message);
  return;
}
