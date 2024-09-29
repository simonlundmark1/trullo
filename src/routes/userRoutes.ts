// src/routes/userRoutes.ts

import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import {
  validateUserCreation,
  validateUserUpdate,
} from '../validators/userValidators';
import { validationResultMiddleware } from '../middlewares/validationResultMiddleware';

const router = Router();

router.post(
  '/',
  validateUserCreation,
  validationResultMiddleware,
  createUser
);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put(
  '/:id',
  validateUserUpdate,
  validationResultMiddleware,
  updateUser
);
router.delete('/:id', deleteUser);

export default router;
