import { authenticate } from '@middlewares';
import { Router } from 'express';
import { createFeed, getFeeds } from '@controllers/feedMessages';

const router = Router();

router.get('/', authenticate, getFeeds);
router.post('/new-feed', authenticate, createFeed);
// router.get('/:feedMessageId', authenticate, feedControllers.getFeedMessageById)

export { router as feedRoutes };
