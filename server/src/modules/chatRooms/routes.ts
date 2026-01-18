/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import { contentCreationRateLimiter, userActionRateLimiter, readRateLimiter } from '../../middlewares/rateLimiters';
import * as chatRoomControllers from './controllers';

const router = Router();

router.post(
  '/new-chatroom/:feedMessageId',
  contentCreationRateLimiter,
  authenticate,
  chatRoomControllers.createChatRoom,
);
router.get('/chatroom-feed/:feedMessageId', readRateLimiter, authenticate, chatRoomControllers.getChatRoomByFeed);
router.get('/chatroom-id/:chatRoomId', readRateLimiter, authenticate, chatRoomControllers.getChatRoomById);
router.get('/chatroom-owner/:ownerId', readRateLimiter, authenticate, chatRoomControllers.getChatRoomByOwner);
router.get('/chatroom-user', readRateLimiter, authenticate, chatRoomControllers.getChatRoomByUser);
router.get('/chatroom-list', readRateLimiter, authenticate, chatRoomControllers.getChatRoomListByUser);
router.get('/available-characters/:chatRoomId', readRateLimiter, authenticate, chatRoomControllers.getAvailableCharacters);
router.get('/check-player/:chatRoomId', readRateLimiter, authenticate, chatRoomControllers.checkPlayerInChat);
router.put('/chatroom-player', userActionRateLimiter, authenticate, chatRoomControllers.addChatRoomPlayer);
router.delete('/chatroom-player', userActionRateLimiter, authenticate, chatRoomControllers.deleteChatRoomPlayer);

export default router;
