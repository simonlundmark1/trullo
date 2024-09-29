
import { body } from 'express-validator';
import mongoose from 'mongoose';

const validStatuses = ['to-do', 'in-progress', 'completed'];

export const validateTaskCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(validStatuses)
    .withMessage(`Status must be one of: ${validStatuses.join(', ')}`),
  body('assignedTo')
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid assignedTo user ID'),
  body('finishedBy')
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid finishedBy user ID'),
];

export const validateTaskUpdate = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('status')
    .optional()
    .isIn(validStatuses)
    .withMessage(`Status must be one of: ${validStatuses.join(', ')}`),
  body('assignedTo')
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid assignedTo user ID'),
  body('finishedBy')
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid finishedBy user ID'),
];
