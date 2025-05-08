import express from 'express';
import { login, logout, signup, refresh } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.post('/refresh', asyncHandler(refresh));
router.post('/logout', asyncHandler(logout));

export default router;