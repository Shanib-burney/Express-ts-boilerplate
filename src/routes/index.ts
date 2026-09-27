import { Router } from 'express';
import userRoutes from './user.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'OK' });
});

router.use('/users', userRoutes);

export default router;
