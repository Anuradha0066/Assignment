import { z } from 'zod';
import type { CreateTaskDto } from '../types/task'; 

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().optional(),
  dueDate: z.string().optional().transform(val => val || undefined),  // ✅ null → undefined
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  status: z.enum(['To Do', 'In Progress', 'Review', 'Completed']),
  assignedToId: z.string().optional().transform(val => val || undefined), // ✅ null → undefined
});


export const updateTaskSchema = createTaskSchema.partial();

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name too short').max(50, 'Name too long'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
});

// export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
