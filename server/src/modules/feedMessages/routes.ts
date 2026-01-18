/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import { contentCreationRateLimiter, readRateLimiter } from '../../middlewares/rateLimiters';
import * as feedControllers from './controllers';

const router = Router();

router.get('/', readRateLimiter, authenticate, feedControllers.getFeeds);
router.get('/:feedId', readRateLimiter, authenticate, feedControllers.getFeedById);
router.post('/new-feed', contentCreationRateLimiter, authenticate, feedControllers.createFeed);

export default router;
