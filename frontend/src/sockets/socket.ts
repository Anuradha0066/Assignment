import io from 'socket.io-client';

type Socket = ReturnType<typeof io>;

let socket: Socket | null = null;

export const initSocket = (userId?: string): Socket => {
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
  
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: { userId },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    timeout: 20000,
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', (socket as any)?.id);
  });

  socket.on('disconnect', (reason: string) => {  // ✅ Explicit string type
    console.log('❌ Socket disconnected:', reason);
  });

  return socket!;
};

export const getSocket = (): Socket => {
  if (!socket) throw new Error('Socket not initialized');
  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
