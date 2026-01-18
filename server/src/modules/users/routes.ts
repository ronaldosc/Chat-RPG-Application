/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import { authRateLimiter, logoutRateLimiter } from '../../middlewares/rateLimiters';
import * as userControllers from './controllers';
// import upload from '../../config/multerProfile';

const router = Router();

router.post('/login', authRateLimiter, userControllers.login);
router.post('/logout', authenticate, logoutRateLimiter, userControllers.logout);
router.post('/signup', authRateLimiter, userControllers.createUser);

// router.get('/:userId', authenticate, getUserInfoById);

// router.patch('/', authenticate, updateMyUser);
// router.patch('/photo', authenticate, upload.single('profilePhoto'), updateMyPhoto);

export default router;
