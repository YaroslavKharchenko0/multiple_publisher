import { z } from 'zod';
import { accessToken, idToken, refreshToken } from './auth';

export const keepSessionValidationSchema = z.object({
  refreshToken,
});

export type KeepSessionRequest = z.infer<typeof keepSessionValidationSchema>;

export const keepSessionResponseSchema = z.object({
  idToken,
  accessToken,
  refreshToken,
});

export type KeepSessionResponse = z.infer<typeof keepSessionResponseSchema>;
