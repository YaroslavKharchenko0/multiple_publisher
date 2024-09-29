import { z } from 'zod';

export const userId = z.number().describe('User id');
export const userEmail = z.string().email().describe('User email');
export const userPassword = z.string().min(8).describe('User password');
export const userProviderId = z.string().uuid().describe('User provider id');
export const userName = z
  .string()
  .min(3)
  .max(100)
  .optional()
  .describe('User name');
export const userBirthDate = z.date().optional().describe('User birth date');

export const userValidationSchema = z.object({
  id: userId,
  email: userEmail,
  createdAt: z.date(),
  updatedAt: z.date(),
  providerId: userProviderId,
  name: userName,
  birthDate: userBirthDate,
});

export type User = z.infer<typeof userValidationSchema>;
