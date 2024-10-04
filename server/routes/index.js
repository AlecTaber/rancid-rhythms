import {Router} from 'express';
import albumRoutes from './albumRoutes.js';
import userRoutes from './userRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.use('/albums', albumRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/auth', authRoutes);
router.use("/api/auth", authRoutes);

export default router;