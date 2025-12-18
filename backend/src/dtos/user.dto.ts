import { z } from 'zod';

export const UpdateUserSchema = z
  .object({
    name: z.string().trim().min(2).max(50).optional(),
    email: z.string().trim().email().optional(),
  })
  .strict();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
