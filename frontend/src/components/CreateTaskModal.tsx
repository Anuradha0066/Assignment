import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTask } from '../api/task.api';
import { createTaskSchema } from '../lib/validators';
import type { CreateTaskDto } from '../types/task';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog';
import { Plus } from 'lucide-react';

interface CreateTaskModalProps {
  onSuccess?: () => void;
}

export function CreateTaskModal({ onSuccess }: CreateTaskModalProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateTaskDto>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      priority: 'Medium',
      status: 'To Do'
    }
  });

  const onSubmit = async (data: CreateTaskDto) => {
    try {
      await createTask(data);
      form.reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 shadow-lg">
          <Plus className="w-5 h-5" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold">Create New Task</DialogTitle>
          <DialogDescription>Create a new task to get started</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4 text-gray-700">
          <div>
            <Input 
           
              placeholder="Enter task title" 
              {...form.register('title')}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.title.message}</p>
            )}
          </div>

          <Input 
            placeholder="Description (optional)" 
            {...form.register('description')}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Priority</label>
              <Select onValueChange={(value) => form.setValue('priority', value as any)} defaultValue="Medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Due Date</label>
              <Input type="date" {...form.register('dueDate')} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
