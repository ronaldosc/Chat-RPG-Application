import { AuthenticatedUserDataRequestModel } from '@interfaces';
import { Request, Response } from 'express';
import { getChatRoomByUserId } from '@services/chatRooms';

export async function getChatRoomByUser(req: Request, { status }: Response): Promise<void> {
  const user = (req as AuthenticatedUserDataRequestModel).userId;

  const chatRooms = await getChatRoomByUserId(user);

  if (chatRooms.error) {
    status(200).json(chatRooms);
    return;
  }

  status(chatRooms.error).json(chatRooms.message);
  return;
}
