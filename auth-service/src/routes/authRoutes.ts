import { Router } from 'express';
import { register, login, updateProfile, deleteProfile, getMe } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/public/auth/register', register);
router.post('/public/auth/login', login);
router.get('/private/auth/me', authenticate, getMe as any);
router.put('/private/auth/profile', authenticate, updateProfile as any);
router.delete('/private/auth/profile', authenticate, deleteProfile as any);

export default router;
