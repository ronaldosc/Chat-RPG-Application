/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import * as feedControllers from './controllers';

const router = Router();

router.post('/new-feed', feedControllers.createFeed);

export default router;
