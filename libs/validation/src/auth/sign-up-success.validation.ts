import { z } from 'zod';
import {
  userBirthDate,
  userEmail,
  userName,
  userProviderId,
} from '../user/user.validation';

export const signUpSuccessValidationSchema = z.object({
  email: userEmail,
  providerId: userProviderId,
  name: userName,
  birthDate: userBirthDate,
});

export type SignUpSuccessRequest = z.infer<
  typeof signUpSuccessValidationSchema
>;
