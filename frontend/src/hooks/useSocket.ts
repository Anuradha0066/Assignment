import { useEffect, useState } from 'react';
import { initSocket } from '../sockets/socket';
import { useAuth } from './useAuth';
import { useTasks } from './useTasks';

export function useSocket() {
  const { user } = useAuth();
  const { mutate } = useTasks();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user?._id) return;

    const socket = initSocket(user._id);

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('task-created', () => mutate());
    socket.on('task-updated', () => mutate());
    socket.on('task-deleted', () => mutate());

    return () => {
      // Keep socket alive
    };
  }, [user?._id, mutate]);

  return { 
    isConnected,
    initSocket 
  };
}
