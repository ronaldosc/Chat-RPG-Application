import { Request, Response } from 'express';
import { getChatRoomsListByUserId } from '../services';
import { AuthenticatedUserDataRequest } from '../../../interfaces';

export async function getChatRoomListByUser(req: Request, res: Response): Promise<void> {
  const user = (req as AuthenticatedUserDataRequest).userId.toString();

  const chatRooms = await getChatRoomsListByUserId(user);

  if (!chatRooms.error) {
    res.status(200).json(chatRooms);
    return;
  }

  res.status(chatRooms.error).json(chatRooms.message);
  return;
}
