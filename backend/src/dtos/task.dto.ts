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
 dueDate: z
      .string()
      .optional()
      .refine((date) => {
        if (!date) return true; // dueDate optional hai
        const selected = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      }, {
        message: 'Past dates are not allowed',
      }),
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
 dueDate: z
      .coerce
      .date()
      .optional()
      .refine((date) => {
        if (!date) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      }, {
        message: 'Past dates are not allowed',
      }),
          priority: PriorityEnum.optional(),
    status: StatusEnum.optional(),
    assignedToId: objectIdSchema.optional(),
  })
  .strict();

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
