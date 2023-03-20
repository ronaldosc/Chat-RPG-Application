import { authenticate } from '@middlewares';
import { Router } from 'express';
import * as ChatFeedControllers from '../modules/chatMessages/controllers';

const router = Router();

router.post('/new-chatfeed', authenticate, ChatFeedControllers.createChatFeed);
router.get('/chatfeeds/:chatRoomId', authenticate, ChatFeedControllers.getChatFeedMessagesByChat);

export { router as chatFeedRoutes };
