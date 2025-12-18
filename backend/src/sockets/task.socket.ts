import { Socket } from 'socket.io';
import { ITask } from '../models/task.model';
import { getIo } from './socket';

export function registerTaskHandlers(socket: Socket) {
  socket.on('join-task', (taskId: string) => {
    socket.join(`task:${taskId}`);
  });

  socket.on('leave-task', (taskId: string) => {
    socket.leave(`task:${taskId}`);
  });
}

export function emitTaskCreated(task: ITask) {
  const io = getIo();
  io.emit('task-created', task);
}

export function emitTaskUpdated(task: ITask) {
  const io = getIo();
  io.to(`task:${task._id}`).emit('task-updated', task);
}

export function emitTaskDeleted(task: ITask) {
  const io = getIo();
  io.emit('task-deleted', task);
}


