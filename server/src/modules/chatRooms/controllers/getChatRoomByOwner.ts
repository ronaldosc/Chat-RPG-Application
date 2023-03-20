import { Request, Response } from 'express';
import { getChatRoomByOwnerId } from '@services/chatRooms';

export async function getChatRoomByOwner(req: Request, { status }: Response): Promise<void> {
  const chatRooms = await getChatRoomByOwnerId(req.params.ownerId);

  if (!chatRooms.error) {
    status(200).json(chatRooms);
    return;
  }

  status(chatRooms.error).json(chatRooms.message);
  return;
}
