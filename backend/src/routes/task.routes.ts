import { Router } from 'express';
import * as controller from '../controllers/task.controller';
import { CreateTaskSchema, UpdateTaskSchema } from '../dtos/task.dto';
import validate from '../middlewares/validate.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);


router.post('/', validate(CreateTaskSchema), controller.createTask);
router.get('/', controller.getTasks);
router.get('/:id', controller.getTask);
router.put('/:id', validate(UpdateTaskSchema), controller.updateTask);
router.delete('/:id', controller.deleteTask);

export default router;
