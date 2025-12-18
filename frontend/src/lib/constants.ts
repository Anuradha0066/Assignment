// Task Statuses
export const TASK_STATUSES = [
  'To Do',
  'In Progress', 
  'Review',
  'Completed'
] as const;

export const TASK_PRIORITIES = [
  'Low',
  'Medium',
  'High',
  'Urgent'
] as const;

export type TaskStatus = typeof TASK_STATUSES[number];
export type TaskPriority = typeof TASK_PRIORITIES[number];

// Dashboard Views
export const DASHBOARD_VIEWS = [
  { id: 'all', label: 'All Tasks' },
  { id: 'assigned', label: 'Assigned to Me' },
  { id: 'created', label: 'Created by Me' },
  { id: 'overdue', label: 'Overdue' }
] as const;

// Priority Colors for UI
export const PRIORITY_COLORS = {
  Low: 'border-blue-200 bg-blue-50 text-blue-800',
  Medium: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  High: 'border-orange-200 bg-orange-50 text-orange-800',
  Urgent: 'border-red-200 bg-red-50 text-red-800'
} as const;

export const STATUS_COLORS = {
  'To Do': 'bg-gray-100 text-gray-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Review': 'bg-yellow-100 text-yellow-800',
  'Completed': 'bg-green-100 text-green-800'
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  TASKS: '/api/v1/tasks',
  AUTH: '/api/v1/auth',
  USERS: '/api/v1/users',
  NOTIFICATIONS: '/api/v1/notifications'
} as const;
