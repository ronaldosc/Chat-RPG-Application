import { authenticate } from '@middlewares';
import { Router } from 'express';
import { createUser, loginAuth, logout } from '@controllers/users';
// import upload from '../../config/multerProfile';

const router = Router();

router.post('/login', loginAuth);
router.post('/logout', authenticate, logout);
router.post('/signup', createUser);

// router.get('/:userId', authenticate, getUserInfoById);

// router.patch('/', authenticate, updateMyUser);
// router.patch('/photo', authenticate, upload.single('profilePhoto'), updateMyPhoto);

export { router as userRoutes };
