import { z } from 'zod';
import { userEmail, userPassword } from '../user/user.validation'

export const signInValidationSchema = z.object({
  email: userEmail,
  password: userPassword,
})

export type SignInRequest = z.infer<typeof signInValidationSchema>

export const signInResponseSchema = z.object({
  idToken: z.string().describe('Id token'),
  accessToken: z.string().describe('Access token'),
  refreshToken: z.string().describe('Refresh token'),
})

export type SignInResponse = z.infer<typeof signInResponseSchema>
