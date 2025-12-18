import * as repo from '../repositories/task.repository';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { Types } from 'mongoose';
import {
  emitTaskCreated,
  emitTaskUpdated,
  emitTaskDeleted,
} from '../sockets/task.socket';
import { emitNotification } from '../sockets/notification.socket';
import { notifyAssignment } from './notification.service';
import  {ITask} from '../models/task.model';
import TaskLog from '../models/taskLog.model';

export async function createTask(
  data: CreateTaskDto & { creatorId: string }
): Promise<ITask> {
  if (!data.creatorId) {
    throw new Error('CREATOR_REQUIRED');
  }

  const task = await repo.createTask({
    ...data,
    creatorId: new Types.ObjectId(data.creatorId),
    assignedToId: data.assignedToId
      ? new Types.ObjectId(data.assignedToId)
      : undefined,
    status: 'To Do'
  });

try {
  emitTaskCreated(task);
} catch (e) {
  console.warn('⚠️ Socket not ready, skipping emit');
}
  return task;
}

export async function getTasks(filter: Record<string, any> = {}) {
  return repo.getTasks(filter);
}

export async function getTask(id: string) {
  return repo.getTaskById(id);
}

export async function updateTask(
  id: string,
  updates: UpdateTaskDto,
  userId: string
): Promise<ITask | null> {
  const previous = await repo.getTaskById(id);
  if (!previous) return null;

  const updated = await repo.updateTaskById(id, {
    ...updates,
    assignedToId: updates.assignedToId
      ? new Types.ObjectId(updates.assignedToId)
      : undefined,
  });

  if (!updated) return null;

  // 🔹 Audit log for status change
  if (updates.status && updates.status !== previous.status) {
    await TaskLog.create({
      taskId: id,
      userId,
      field: 'status',
      oldValue: previous.status,
      newValue: updates.status,
    });
  }

  // 🔹 Audit log for priority change (optional but nice)
  if (updates.priority && updates.priority !== previous.priority) {
    await TaskLog.create({
      taskId: id,
      userId,
      field: 'priority',
      oldValue: previous.priority,
      newValue: updates.priority,
    });
  }

  // Emit updates for real-time sync
  if (
    (updates.status && updates.status !== previous.status) ||
    (updates.priority && updates.priority !== previous.priority)
  ) {
    try {
      emitTaskUpdated(updated);
    } catch {
      console.warn('⚠️ Socket not ready, skipping emit');
    }
  }

  // Assignment notification (ye block as‑is rehne do)
  if (
    updates.assignedToId &&
    updates.assignedToId !== previous.assignedToId?.toString()
  ) {
    const notification = await notifyAssignment({
      userId: updates.assignedToId,
      taskId: id,
      message: 'You have been assigned a new task',
    });

    emitNotification(updates.assignedToId, notification);
  }

  return updated;
}

export async function deleteTask(id: string) {
  const deleted = await repo.deleteTaskById(id);
  if (deleted) {
  try {
  emitTaskDeleted(deleted);
} catch {
  console.warn('⚠️ Socket not ready, skipping emit');
}

  }
  return deleted;
}

export default {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
