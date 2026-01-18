/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import { contentCreationRateLimiter } from '../../middlewares/rateLimiters';
import * as ChatFeedControllers from './controllers';

const router = Router();

router.post('/new-chatfeed', authenticate, contentCreationRateLimiter, ChatFeedControllers.createChatFeed);
router.get('/chatfeeds/:chatRoomId', authenticate, ChatFeedControllers.getChatFeedMessagesByChat);

export default router;
