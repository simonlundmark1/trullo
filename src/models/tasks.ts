import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'to-do' | 'in progress' | 'blocked' | 'done';
  assignedTo: mongoose.Types.ObjectId;
  createdAt: Date;
  finishedBy: Date;
}

const TaskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['to-do', 'in progress', 'blocked', 'done'],
    default: 'to-do',
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  finishedBy: Date,
});

export default mongoose.model<ITask>('Task', TaskSchema);
