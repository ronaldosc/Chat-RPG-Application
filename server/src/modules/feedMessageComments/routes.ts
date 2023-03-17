/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import * as feedMessagesControllers from './controllers';

const router = Router();

router.post('/new-comment', authenticate, feedMessagesControllers.createFeedComment);
router.delete('/:commentId', authenticate, feedMessagesControllers.deleteFeedComment);

export default router;
