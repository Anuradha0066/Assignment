import { z } from 'zod';

export const PriorityEnum = z.enum(['Low', 'Medium', 'High', 'Urgent']);

export const StatusEnum = z.enum([
  'To Do',
  'In Progress',
  'Review',
  'Completed',
]);

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).default('Medium'),
  // creatorId: z.string(),
  assignedToId: z.string().optional(),
  status: z.enum(['To Do', 'In Progress', 'Review', 'Completed']).default('To Do'), // ✅ yahan add
})
  .strict();

export const UpdateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(100).optional(),
    description: z.string().trim().optional(),
    dueDate: z.coerce.date().optional(),
    priority: PriorityEnum.optional(),
    status: StatusEnum.optional(),
    assignedToId: objectIdSchema.optional(),
  })
  .strict();

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
