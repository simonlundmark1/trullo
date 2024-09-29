// src/routes/taskRoutes.ts

import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import {
  validateTaskCreation,
  validateTaskUpdate,
} from '../validators/taskValidators';
import { validationResultMiddleware } from '../middlewares/validationResultMiddleware';

const router = Router();

router.post(
  '/',
  validateTaskCreation,
  validationResultMiddleware,
  createTask
);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put(
  '/:id',
  validateTaskUpdate,
  validationResultMiddleware,
  updateTask
);
router.delete('/:id', deleteTask);

export default router;
