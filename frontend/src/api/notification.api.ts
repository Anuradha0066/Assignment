import axiosInstance from './axios';
import type { Notification } from '../types/notification';

export const getNotifications = async (): Promise<Notification[]> => {
  const res = await axiosInstance.get<{ notifications: Notification[] }>('/notifications');
  return res.data.notifications;
};
