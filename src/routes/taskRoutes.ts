import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController';

const router = Router();

router.post('/', createTask);       // Create a new task
router.get('/', getTasks);          // Get all tasks
router.get('/:id', getTaskById);    // Get a task by ID
router.put('/:id', updateTask);     // Update a task
router.delete('/:id', deleteTask);  // Delete a task

export default router;
