import mongoose, { Schema, Document } from 'mongoose';

// ✅ INTERFACE EXPORT KARO (pehle add karo)
export interface ITask extends Document {
  title: string;
  description: string;
  dueDate?: Date;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
  creatorId: mongoose.Types.ObjectId;
  assignedToId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, default: '' },
  dueDate: { type: Date },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Review', 'Completed'],
    default: 'To Do'
  },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedToId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);
