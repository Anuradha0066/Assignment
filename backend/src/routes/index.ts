import { Router } from 'express';
import authRoutes from './auth.routes';
import taskRoutes from './task.routes';
import notificationRoutes from './notification.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/notifications', notificationRoutes);
router.use('/users', userRoutes);

export const apiRouter = Router();
apiRouter.use('/api/v1', router);

export default apiRouter;
