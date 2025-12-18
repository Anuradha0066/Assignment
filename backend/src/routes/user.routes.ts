import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller';
import validate from '../middlewares/validate.middleware';
import { UpdateUserSchema } from '../dtos/user.dto';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/me', getProfile);
router.put('/me', validate(UpdateUserSchema), updateProfile);

export default router;
