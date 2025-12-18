import { useCallback } from 'react';
import { useAuth as useAuthContext } from '../context/AuthContext';
import { getMe, login, logout } from '../api/auth.api';
import { useTasks } from './useTasks';
import type { User } from '../types/user';

export function useAuth() {
  const { user, setUser, loading } = useAuthContext();
  const { mutate: mutateTasks } = useTasks();

  const signIn = useCallback(async (email: string, password: string) => {
    const { user } = await login({ email, password });
    setUser(user);
    mutateTasks(); // Refresh tasks
    return user;
  }, [setUser, mutateTasks]);

  const signOut = useCallback(async () => {
    await logout();
    setUser(null);
    mutateTasks();
  }, [setUser, mutateTasks]);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
    }
  }, [setUser]);

  return {
    user,
    loading,
    signIn,
    signOut,
    refreshUser,
    isAuthenticated: !!user,
  };
}
