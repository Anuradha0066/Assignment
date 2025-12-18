import {axiosInstance} from './axios';
import type { User } from '../types/user';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

// ✅ FIXED REGISTER - No type annotation on axios.post
export const register = async (data: RegisterDto): Promise<{ user: User }> => {
  const res = await axiosInstance.post('/auth/register', data);
  return res.data;  // Return full { user: {...} }
};

// ✅ FIXED LOGIN
export const login = async (credentials: LoginDto): Promise<{ user: User; token: string }> => {
  const response = await axiosInstance.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  
  return response.data;
};

// ✅ FIXED getMe
export const getMe = async (): Promise<User> => {
  const response = await axiosInstance.get('/auth/me');
  return response.data.user;
};

export const logout = async () => {
  await axiosInstance.post('/auth/logout');
};
