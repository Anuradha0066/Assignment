import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export async function createTask(req: Request, res: Response) {
  const creatorId = req.userId;
  if (!creatorId) return res.status(401).json({ error: 'Unauthorized' });

  const task = await taskService.createTask({
    ...req.body,
    creatorId,
  });

  res.status(201).json({ task });
}

export async function getTasks(req: Request, res: Response) {
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });
  const tasks = await taskService.getTasks();
  res.json({ tasks });
}


export async function getTask(req: Request, res: Response) {
  const { id } = req.params;
  const task = await taskService.getTask(id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json({ task });
}

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const updates = req.body;
  const currentUser = req.userId;
  const task = await taskService.getTask(id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  // Authorization: only creator or assigned user can update
  if (task.creatorId.toString() !== currentUser && task.assignedToId?.toString() !== currentUser) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const updated = await taskService.updateTask(id, updates, currentUser!);
  res.json({ task: updated });
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const currentUser = req.userId;
  const task = await taskService.getTask(id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  if (task.creatorId.toString() !== currentUser) return res.status(403).json({ error: 'Forbidden' });
  await taskService.deleteTask(id);
  res.status(204).send();
}

export default { createTask, getTasks, getTask, updateTask, deleteTask };
