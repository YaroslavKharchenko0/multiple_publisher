import { z } from 'zod';
import { accessToken } from './auth';

export const signOutValidationSchema = z.object({
  accessToken,
});

export type SignOutRequest = z.infer<typeof signOutValidationSchema>;

export const signOutSuccessValidationSchema = z.object({
  success: z.boolean(),
});

export type SignOutSuccessRequest = z.infer<
  typeof signOutSuccessValidationSchema
>;
