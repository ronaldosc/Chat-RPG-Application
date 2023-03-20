import { AuthenticatedUserDataRequestModel } from '@interfaces';
import { Request, Response } from 'express';
import { getChatRoomsListByUserId } from '@services/chatRooms';

export async function getChatRoomListByUser(req: Request, { status }: Response): Promise<void> {
  const user = (req as AuthenticatedUserDataRequestModel).userId.toString();
  const chatRooms = await getChatRoomsListByUserId(user);

  if (!chatRooms.error) {
    status(200).json(chatRooms);
    return;
  }

  status(chatRooms.error).json(chatRooms.message);
  return;
}
