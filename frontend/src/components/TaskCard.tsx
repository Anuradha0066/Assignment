// Replace TaskCard.tsx with this FIXED version:

import { useState } from 'react';
import { Clock, User, AlertCircle, Trash2, CheckCircle2 } from 'lucide-react';
import type { Task } from '../types/task';
import { updateTask, deleteTask } from '../api/task.api';

interface TaskCardProps {
  task: Task;
  onUpdate?: (data?: any, options?: any) => void; // SWR mutate aa raha hai yahan
}


const PRIORITY_COLORS: Record<string, string> = {
  Low: 'border-blue-200 bg-blue-50 ring-blue-100',
  Medium: 'border-yellow-200 bg-white-50 ring-yellow-100', 
  High: 'border-orange-200 bg-orange-50 ring-orange-100',
  Urgent: 'border-red-200 bg-red-50 ring-red-100'
};

const STATUS_COLORS: Record<string, string> = {
  'To Do': 'bg-gray-100 text-gray-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Review: 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800'
};

export default function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [isSaving, setIsSaving] = useState(false);

  const isOverdue =
    task.dueDate && new Date(task.dueDate).getTime() < Date.now();

  const priorityColor =
    PRIORITY_COLORS[task.priority] ||
    'border-gray-200 bg-gray-50 ring-gray-100';
  const statusColor =
    STATUS_COLORS[task.status] || 'bg-gray-100 text-gray-800';

  // ✅ Optimistic status change
  const handleStatusChange = async (newStatus: Task['status']) => {
    if (newStatus === task.status) return;
    if (!onUpdate) return;

    setIsSaving(true);
    const optimisticTask = { ...task, status: newStatus };

    // 1) Optimistic UI
    onUpdate(
      (current: { tasks: Task[] }) => ({
        tasks: current.tasks.map((t) =>
          t._id === task._id ? optimisticTask : t
        ),
      }),
      { revalidate: false }
    );

    try {
      await updateTask(task._id, { status: newStatus });
      // 2) Refetch from server
      onUpdate();
    } catch (e) {
      // 3) Rollback via refetch
      onUpdate();
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Optimistic delete
  const handleDelete = async () => {
    if (!onUpdate) return;
    const ok = window.confirm('Delete this task?');
    if (!ok) return;

    setIsSaving(true);

    // 1) Optimistic removal
    onUpdate(
      (current: { tasks: Task[] }) => ({
        tasks: current.tasks.filter((t) => t._id !== task._id),
      }),
      { revalidate: false }
    );

    try {
      await deleteTask(task._id);
      // 2) Confirm from server
      onUpdate();
    } catch (e) {
      // 3) Rollback
      onUpdate();
    } finally {
      setIsSaving(false);
    }
  };


  return (
  <div
    className={`
      group bg-white/80 backdrop-blur-sm border rounded-2xl p-6 shadow-sm 
      hover:shadow-xl transition-all duration-300 hover:-translate-y-1
      ${priorityColor}
    `}
  >
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {task.status}
        </div>
        {isOverdue && (
          <div className="flex items-center gap-1 text-red-500 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">
            <AlertCircle className="w-3 h-3" />
            Overdue
          </div>
        )}
      </div>
    </div>

    {/* Title */}
    <h3 className="font-semibold text-lg leading-6 mb-2 line-clamp-2 text-gray-900">
      {task.title}
    </h3>

    {/* Description */}
    {task.description && (
      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
        {task.description}
      </p>
    )}

    {/* Footer */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div className="flex items-center gap-4 text-sm text-gray-500">
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {new Date(task.dueDate).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        )}
        {task.assignedToId && (
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            Assigned
          </div>
        )}
      </div>

      {/* 👇 yahan pe right side ka pura block replace karo */}
      <div className="flex items-center gap-2">
        {/* Existing priority pill – bilkul same rakha */}
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium 
          ${task.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-indigo-100 text-indigo-800'}`}
        >
          {task.priority}
        </div>

        {/* ✅ Next status button */}
        <button
          type="button"
          disabled={isSaving}
          className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1"
          onClick={() =>
            handleStatusChange(
              task.status === 'To Do'
                ? 'In Progress'
                : task.status === 'In Progress'
                ? 'Review'
                : task.status === 'Review'
                ? 'Completed'
                : 'Completed'
            )
          }
        >
          <CheckCircle2 className="w-3 h-3" />
          {isSaving ? 'Saving...' : 'Next'}
        </button>

        {/* ✅ Delete button */}
        <button
          type="button"
          disabled={isSaving}
          onClick={handleDelete}
          className="p-2 rounded-full hover:bg-red-50 text-red-500 hover:text-red-600"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);
}