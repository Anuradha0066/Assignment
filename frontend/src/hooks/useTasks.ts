import useSWR from 'swr';
import { axiosInstance } from '../api/axios';
import type { Task } from '../types/task';

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

export function useTasks() {
  const { data, error, mutate, isLoading } = useSWR(
    '/tasks', 
    fetcher,
    {
      revalidateOnFocus: false,  
      revalidateIfStale: false,  
    }
  );

  return { 
    tasks: data?.tasks || [], 
    error, 
    mutate, 
    loading: isLoading 
  };
}
