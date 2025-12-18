import Task, { ITask } from '../models/task.model';
import { Types } from 'mongoose';

export interface TaskFilter {
  creatorId?: Types.ObjectId;
  assignedToId?: Types.ObjectId;
  status?: string;
}

export async function createTask(
  data: Omit<ITask, '_id' | 'createdAt' | 'updatedAt'>
): Promise<ITask> {
  return Task.create(data);
}

export async function getTasks(
  filter: TaskFilter = {}
): Promise<ITask[]> {
  return Task.find(filter)
    .sort({ createdAt: -1 })
    .lean()
    .exec();
}

export async function getTaskById(
  id: string | Types.ObjectId
): Promise<ITask | null> {
  return Task.findById(id).exec();
}

export async function updateTaskById(
  id: string | Types.ObjectId,
  updates: Partial<ITask>
): Promise<ITask | null> {
  return Task.findByIdAndUpdate(id, updates, {
    new: true,
  }).exec();
}

export async function deleteTaskById(
  id: string | Types.ObjectId
): Promise<ITask | null> {
  return Task.findByIdAndDelete(id).exec();
}

export default {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
