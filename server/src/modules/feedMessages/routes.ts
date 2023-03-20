/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import * as feedControllers from './controllers';

const router = Router();

router.get('/', authenticate, feedControllers.getFeeds);
router.get('/:feedId', authenticate, feedControllers.getFeedById);
router.post('/new-feed', authenticate, feedControllers.createFeed);

export default router;
