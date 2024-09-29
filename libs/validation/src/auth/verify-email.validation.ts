import { z } from 'zod';

export const verifyEmailValidationSchema = z.object({
  code: z.string(),
  email: z.string().email(),
});

export type VerifyEmailRequest = z.infer<typeof verifyEmailValidationSchema>;

export type VerifyEmailResponse = null;
