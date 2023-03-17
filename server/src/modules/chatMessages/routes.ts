/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import * as ChatFeedControllers from './controllers';

const router = Router();

router.post('/new-chatfeed', authenticate, ChatFeedControllers.createChatFeed);
router.get('/chatfeeds/:chatRoomId', authenticate, ChatFeedControllers.getChatFeedMessagesByChat);

export default router;
