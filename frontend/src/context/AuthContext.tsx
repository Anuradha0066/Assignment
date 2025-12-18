// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;  // ✅ ADDED setUser
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ TEMPORARY MOCK checkAuthToken (replace with your API)
  const checkAuthToken = async (): Promise<User | null> => {
    try {
      // Replace with your real API call
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      // Mock user for now - REPLACE WITH REAL API
      return {
        id: '1',
        email: 'user@example.com',
        name: 'Test User'
      };
    } catch {
      return null;
    }
  };

  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await checkAuthToken();
        setUser(userData);
      } catch (error) {
        console.log('No auth token');
        setUser(null);
      } finally {
        setLoading(false);  // ✅ FIXES infinite loading
      }
    };
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
