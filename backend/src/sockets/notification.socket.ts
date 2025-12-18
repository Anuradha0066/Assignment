import { Socket } from 'socket.io';
import { INotification } from '../models/notification.model';
import { getIo } from './socket';

export function registerNotificationHandlers(socket: Socket) {
  socket.on('subscribe-notifications', () => {
    const userId = socket.handshake.auth?.userId;
    if (userId) {
      socket.join(`notifications:${userId}`);
    }
  });
}

export function emitNotification(
  userId: string,
  notification: INotification
) {
  const io = getIo();
  io.to(`notifications:${userId}`).emit('notification', notification);
}

export default {
  registerNotificationHandlers,
  emitNotification,
};
