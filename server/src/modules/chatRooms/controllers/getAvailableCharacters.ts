import { Request, Response } from 'express';
import { getAvailableCharactersByChatRoomId } from '../services';

export async function getAvailableCharacters(req: Request, res: Response): Promise<void> {
  const chatRoomId = req.params.chatRoomId;

  const result = await getAvailableCharactersByChatRoomId(chatRoomId);

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.error).json(result.message);
  return;
}
