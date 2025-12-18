import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email(),
  password: z.string().min(6).max(100),
});

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(100),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
