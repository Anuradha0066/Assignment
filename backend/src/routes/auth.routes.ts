import { Router } from 'express';
import * as controller from '../controllers/auth.controller';
import { RegisterSchema, LoginSchema } from '../dtos/auth.dto';
import validate from '../middlewares/validate.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', validate(RegisterSchema), controller.register);
router.post('/login', validate(LoginSchema), controller.login);

// Session identity
router.get('/me', authMiddleware, controller.me);

// Logout does not strictly need auth
router.post('/logout', controller.logout);

export default router;
