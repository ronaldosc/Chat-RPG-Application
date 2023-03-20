/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import * as reactionControllers from './controllers';

const router = Router();

router.post('/like', authenticate, reactionControllers.reactToFeed);

export default router;
