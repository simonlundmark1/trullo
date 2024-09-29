import { RequestHandler } from 'express';
import Task, { ITask } from '../models/tasks';
import User from '../models/user';

// Gör ny task
export const createTask: RequestHandler = async (req, res, next) => {
  try {

    // Kolla json body
    console.log('Request Body:', req.body); 
    
    const { title, description, status, assignedTo, finishedBy } = req.body;

    // Validering
    if (!title) {
      
      res.status(400).json({ msg: 'Title is required' });
      return;
    }

    // Kolla om assignedTo user finns
    if (assignedTo && !(await User.findById(assignedTo))) {
      res.status(400).json({ msg: 'Assigned user does not exist' });
      return;
    }

    const newTask: ITask = new Task({
      title,
      description,
      status,
      assignedTo,
      finishedBy,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    next(err);
  }
};

// Get all tasks
export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Get task by ID
export const getTaskById: RequestHandler = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email');
    if (!task) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Update task
export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const { assignedTo } = req.body;

    // Check if assignedTo user exists
    if (assignedTo && !(await User.findById(assignedTo))) {
      res.status(400).json({ msg: 'Assigned user does not exist' });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('assignedTo', 'name email');

    if (!updatedTask) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// Delete task
export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
