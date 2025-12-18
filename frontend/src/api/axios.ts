// frontend/src/api/axios.ts - CORRECT EXPORT
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // 🔥 Cookies for auth
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// ✅ BOTH NAMED + DEFAULT EXPORT
export default axiosInstance;
