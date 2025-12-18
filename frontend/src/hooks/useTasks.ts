import useSWR from 'swr';
import { axiosInstance } from '../api/axios';
import type { Task } from '../types/task';

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

export function useTasks() {
  // ✅ STATIC KEY - NO dynamic params = NO re-fetch loop
  const { data, error, mutate, isLoading } = useSWR(
    '/tasks',  // ✅ SIMPLE STRING - no object/function
    fetcher,
    {
      revalidateOnFocus: false,  // ✅ DISABLE auto-refetch
      revalidateIfStale: false,  // ✅ NO stale revalidation
    }
  );

  return { 
    tasks: data?.tasks || [], 
    error, 
    mutate, 
    loading: isLoading 
  };
}
