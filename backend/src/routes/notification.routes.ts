import { Router } from 'express';
import { getNotifications } from '../controllers/notification.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);
router.get('/', getNotifications);

export default router;
