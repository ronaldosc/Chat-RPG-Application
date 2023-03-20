import { authenticate } from '@middlewares';
import { Router } from 'express';
import * as reactionControllers from '../modules/feedMessageLikes/controllers';

const router = Router();

router.post('/like', authenticate, reactionControllers.likeFeed);
router.delete('/like', authenticate, reactionControllers.dislikeFeed);

export { router as reactionRoutes };
