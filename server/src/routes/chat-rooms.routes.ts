import { authenticate } from '@middlewares';
import { Router } from 'express';
import * as chatRoomControllers from '../modules/chatRooms/controllers';

const router = Router();

router.post('/new-chatroom/:feedMessageId', authenticate, chatRoomControllers.createChatRoom);
router.get('/chatroom-feed/:feedMessageId', authenticate, chatRoomControllers.getChatRoomByFeed);
router.get('/chatroom-id/:chatRoomId', authenticate, chatRoomControllers.getChatRoomById);
router.get('/chatroom-owner/:ownerId', authenticate, chatRoomControllers.getChatRoomByOwner);
router.get('/chatroom-user', authenticate, chatRoomControllers.getChatRoomByUser);
router.get('/chatroom-list', authenticate, chatRoomControllers.getChatRoomListByUser);
router.put('/chatroom-player', authenticate, chatRoomControllers.addChatRoomPlayer);

export { router as chatRoomRoutes };
