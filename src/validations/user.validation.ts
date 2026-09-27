import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('invalid email'),
  age: z.number().int().positive().optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const userIdParamSchema = z.object({
  id: z.string().uuid('invalid user id'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
