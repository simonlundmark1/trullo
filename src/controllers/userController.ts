import { RequestHandler } from 'express';
import User, { IUser } from '../models/user';

// Helper function to extract error message
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'An unexpected error occurred';
}

// Create a new user
export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;


    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    const newUser: IUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    next(err);
  }
};

// Get all users
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Get user by ID
export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');
    if (!updatedUser) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res.json({ msg: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
