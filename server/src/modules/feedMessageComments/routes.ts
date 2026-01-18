/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import { contentCreationRateLimiter, userActionRateLimiter } from '../../middlewares/rateLimiters';
import * as feedMessagesControllers from './controllers';

const router = Router();

router.post('/new-comment', contentCreationRateLimiter, authenticate, feedMessagesControllers.createFeedComment);
router.delete('/:commentId', userActionRateLimiter, authenticate, feedMessagesControllers.deleteFeedComment);

export default router;
