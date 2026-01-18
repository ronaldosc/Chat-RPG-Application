/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import { contentCreationRateLimiter, readRateLimiter } from '../../middlewares/rateLimiters';
import * as ChatFeedControllers from './controllers';

const router = Router();

router.post('/new-chatfeed', contentCreationRateLimiter, authenticate, ChatFeedControllers.createChatFeed);
router.get('/chatfeeds/:chatRoomId', readRateLimiter, authenticate, ChatFeedControllers.getChatFeedMessagesByChat);

export default router;
