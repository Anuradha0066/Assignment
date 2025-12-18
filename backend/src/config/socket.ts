import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { registerTaskHandlers } from '../sockets/task.socket';
import { registerNotificationHandlers } from '../sockets/notification.socket';

let io: SocketIOServer | null = null;

export function initSocket(server: HttpServer): SocketIOServer {
  io = new SocketIOServer(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    registerTaskHandlers(socket);
    registerNotificationHandlers(socket);
  });

  console.log('⚡ Socket.io initialized');

  return io;
}

export function getIo(): SocketIOServer {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}

export default { initSocket, getIo };
