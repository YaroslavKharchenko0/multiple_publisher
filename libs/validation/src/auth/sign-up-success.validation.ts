import { z } from 'nestjs-zod/z'
import { userEmail, userProviderId } from '../user/user.validation';

export const signUpSuccessValidationSchema = z.object({
  email: userEmail,
  providerId: userProviderId,
})

export type SignUpSuccessRequest = z.infer<typeof signUpSuccessValidationSchema>
