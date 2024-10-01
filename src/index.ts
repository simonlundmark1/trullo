import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://dbUser:bajskorv@cluster0.myhly.mongodb.net/trullo?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Error-handling middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const errorMessage =
    err instanceof Error ? err.message : 'An unexpected error occurred';
  res.status(500).json({ error: errorMessage });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
