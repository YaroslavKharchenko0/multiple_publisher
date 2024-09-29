import { z } from 'zod';
import { userEmail } from '../user';

export const verifyEmailValidationSchema = z.object({
  code: z.string().describe('Verification code'),
  email: userEmail,
});

export type VerifyEmailRequest = z.infer<typeof verifyEmailValidationSchema>;

export type VerifyEmailResponse = null;
