import useSWR from 'swr';
import axiosInstance from './axios';
import type { Task, CreateTaskDto } from '../types/task';

const fetcher = (url: string) => axiosInstance.get<{ tasks: Task[] }>(url).then(res => res.data);

export const useTasks = () => {
  const { data, error, mutate, isLoading } = useSWR<{ tasks: Task[] }>('/tasks', fetcher);
  return { 
    tasks: data?.tasks || [], 
    error, 
    mutate, 
    loading: isLoading 
  };
};

export const createTask = async (data: CreateTaskDto): Promise<Task> => {
  const res = await axiosInstance.post<{ task: Task }>('/tasks', data);
  return res.data.task;
};

export const updateTask = async (id: string, data: Partial<CreateTaskDto>): Promise<Task> => {
  const res = await axiosInstance.put<{ task: Task }>(`/tasks/${id}`, data);
  return res.data.task;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/${id}`);
};
