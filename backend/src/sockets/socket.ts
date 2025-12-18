import { Server } from 'socket.io';
import { registerTaskHandlers } from './task.socket';
import { registerNotificationHandlers } from './notification.socket';

let io: Server | null = null;

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.auth?.userId;

    if (userId) {
      socket.join(`user:${userId}`);
    }

    registerTaskHandlers(socket);
    registerNotificationHandlers(socket);
  });

  return io;
}

export function getIo(): Server {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}

export default {
  initSocket,
  getIo,
};
