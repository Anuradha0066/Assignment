import { useCallback } from 'react';
import { useTasks } from './useTasks';
import { createTask } from '../api/task.api';
import type { Task, CreateTaskDto } from '../types/task';

export function useCreateTask() {
  const { mutate } = useTasks();

  const create = useCallback(async (taskData: CreateTaskDto) => {
    try {
      const optimisticTask: Task = {
        _id: `temp-${Date.now()}`,
        ...taskData,
        status: 'To Do',
        priority: taskData.priority || 'Medium',
        creatorId: '', 
        assignedToId: taskData.assignedToId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mutate(
        (currentData: { tasks: Task[] } | undefined) => ({
          tasks: [optimisticTask, ...(currentData?.tasks || [])],
        }),
        { revalidate: false }
      );

      const newTask = await createTask(taskData);

      mutate(
        (currentData: { tasks: Task[] } | undefined) => ({
          tasks: currentData?.tasks?.map((task) =>
            task._id === optimisticTask._id ? newTask : task
          ) || [],
        }),
        { revalidate: false }
      );

      return newTask;
    } catch (error) {
      mutate();
      throw error;
    }
  }, [mutate]);

  return { create };
}
