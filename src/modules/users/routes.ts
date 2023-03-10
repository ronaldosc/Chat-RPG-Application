import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import { createUser, login } from './controllers';
// import upload from '../../config/multerProfile';

const router = Router();

router.post('/login', login);
router.post('/signup', createUser);

router.get('/:userId', authenticate, getUserInfoById);

router.patch('/', authenticate, updateMyUser);
// router.patch('/photo', authenticate, upload.single('profilePhoto'), updateMyPhoto);

export default router;
