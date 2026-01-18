/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import { userActionRateLimiter } from '../../middlewares/rateLimiters';
import * as reactionControllers from './controllers';

const router = Router();

router.post('/like', authenticate, userActionRateLimiter, reactionControllers.reactToFeed);

export default router;
