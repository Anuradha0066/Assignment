import mongoose, { Schema } from 'mongoose';

const TaskLogSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    field: { type: String, required: true },     
    oldValue: { type: String },
    newValue: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('TaskLog', TaskLogSchema);
