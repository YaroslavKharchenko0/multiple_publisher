import { z } from 'zod';
import { userEmail, userPassword } from '../user/user.validation';
import { accessToken, idToken, refreshToken } from './auth';

export const signInValidationSchema = z.object({
  email: userEmail,
  password: userPassword,
});

export type SignInRequest = z.infer<typeof signInValidationSchema>;

export const signInResponseSchema = z.object({
  idToken,
  accessToken,
  refreshToken,
});

export type SignInResponse = z.infer<typeof signInResponseSchema>;
