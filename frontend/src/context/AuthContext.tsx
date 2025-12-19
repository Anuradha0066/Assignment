import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;  
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

  const checkAuthToken = async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      return {
        _id: '1',
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
        setLoading(false);  
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
