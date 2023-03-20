import { authenticate } from '@middlewares';
import { Router } from 'express';
import * as feedMessagesControllers from '../modules/feedMessageComments/controllers';

const router = Router();

router.post('/new-comment', authenticate, feedMessagesControllers.createFeedComment);
router.delete('/:commentId', authenticate, feedMessagesControllers.deleteFeedComment);

export { router as feedCommentRoutes };
