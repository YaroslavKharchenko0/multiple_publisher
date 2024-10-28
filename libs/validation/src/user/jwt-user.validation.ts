import { z } from 'zod';
import { userEmail, userId, userName } from './user.validation';
import { role } from '../role';

export const jwtUserValidationSchema = z.object({
  id: z.string().uuid(),
  email: userEmail,
  email_verified: z.boolean(),
  app_id: userId,
  role: role,
  name: userName,
});

export type BaseJWTUser = z.infer<typeof jwtUserValidationSchema>;

export const idTokenUserValidationSchema = z.object({
  sub: z.string().uuid(),
  email_verified: z.boolean(),
  email: userEmail,
  token_use: z.string(),
  auth_time: z.number(),
  iss: z.string(),
  exp: z.number(),
  iat: z.number(),
  jti: z.string(),
  client_id: z.string(),
  name: userName,
  'custom:role': role,
  'custom:app_id': userId,
});

export type IdTokenUser = z.infer<typeof idTokenUserValidationSchema>;
