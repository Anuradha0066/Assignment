import { TaskPriority, TaskStatus } from './constants';

export const formatPriority = (priority: TaskPriority) => {
  const labels: Record<TaskPriority, string> = {
    Low: 'Low Priority',
    Medium: 'Medium Priority',
    High: 'High Priority',
    Urgent: '🚨 Urgent'
  };
  return labels[priority];
};

export const formatStatus = (status: TaskStatus) => {
  const labels: Record<TaskStatus, string> = {
    'To Do': 'To Do',
    'In Progress': 'In Progress',
    'Review': 'Review',
    'Completed': '✅ Completed'
  };
  return labels[status];
};

export const getPriorityIcon = (priority: TaskPriority) => {
  const icons: Record<TaskPriority, string> = {
    Low: '🟢',
    Medium: '🟡',
    High: '🟠',
    Urgent: '🔴'
  };
  return icons[priority];
};

export const isOverdue = (dueDate?: string | Date) => {
  if (!dueDate) return false;
  return new Date(dueDate).getTime() < Date.now();
};
