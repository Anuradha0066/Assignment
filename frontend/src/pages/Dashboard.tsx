import { useState, useMemo, useCallback } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import Navbar from '../components/Navbar';
import { CreateTaskModal } from '../components/CreateTaskModal';
import type { Task } from '../types/task';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { tasks, loading, error, mutate } = useTasks();
  const { isConnected } = useSocket();
  const [view, setView] = useState<'all' | 'assigned' | 'created' | 'overdue'>('all');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const displayTasks = loading || error 
    ? [{ _id: '1', title: 'Sample Task', status: 'To Do' as const, priority: 'Medium' as const, creatorId: user?._id || 'demo' }]
    : tasks;

    
  const stats = useMemo(() => {
    if (!user?._id || displayTasks.length === 0) {
      return { all: 0, assigned: 0, created: 0, overdue: 0 };
    }
    return {
      all: displayTasks.length,
      assigned: displayTasks.filter((t: Task) => t.assignedToId === user._id).length,
      created: displayTasks.filter((t: Task) => t.creatorId === user._id).length,
      overdue: displayTasks.filter((t: Task) => 
        t.dueDate && new Date(t.dueDate).getTime() < Date.now()
      ).length,
    };
  }, [displayTasks, user?._id]);

  const filteredTasks = useMemo(() => {
    return displayTasks
      .filter((task: Task) => {
        if (view === 'assigned' && task.assignedToId !== user?._id) return false;
        if (view === 'created' && task.creatorId !== user?._id) return false;
        if (view === 'overdue' && (!task.dueDate || new Date(task.dueDate).getTime() >= Date.now())) return false;
        if (statusFilter !== 'All' && task.status !== statusFilter) return false;
        if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;
        return true;
      })
      .sort((a: Task, b: Task) => {
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        return 0;
      });
  }, [displayTasks, view, statusFilter, priorityFilter, user?._id]);

  const handleTaskCreated = useCallback(() => {
    mutate();
  }, [mutate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              {loading ? 'Connecting to backend...' : 'Manage your tasks efficiently'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn(
              'px-4 py-2 rounded-2xl text-sm font-medium',
              isConnected 
                ? 'bg-green-100 text-green-800 ring-2 ring-green-200' 
                : 'bg-gray-100 text-gray-600 ring-2 ring-gray-200'
            )}>
              {isConnected ? '🟢 Live' : '🔴 Offline'}
            </div>
           
            <CreateTaskModal onSuccess={handleTaskCreated} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'all', label: 'All Tasks', count: stats.all },
            { id: 'assigned', label: 'Assigned', count: stats.assigned },
            { id: 'created', label: 'Created', count: stats.created },
            { id: 'overdue', label: 'Overdue', count: stats.overdue },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={cn(
                'group p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl',
                view === tab.id
                  ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
                  : 'border-gray-200 bg-white/50 hover:border-gray-300 hover:-translate-y-1'
              )}
            >
              <div className="text-2xl font-bold text-gray-900 mb-1">{tab.count}</div>
              <div className="text-sm text-gray-600 group-hover:text-gray-900">{tab.label}</div>
            </button>
          ))}
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-64" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-gray-500 bg-white/50 rounded-2xl p-8">
              <div className="text-2xl mb-4">⚠️ Backend Offline</div>
              <p>Showing demo data. Backend will sync when online.</p>
              <button 
                onClick={() => mutate()} 
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              >
                Retry Connection
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white/50 rounded-2xl p-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-2xl animate-pulse"></div>
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p>Try adjusting your filters or create a new task</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredTasks.map((task: Task) => (
                <TaskCard key={task._id} task={task} onUpdate={mutate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
