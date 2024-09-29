import { z } from 'zod';
import {
  userBirthDate,
  userEmail,
  userName,
  userPassword,
} from '../user/user.validation';

export const signUpValidationSchema = z.object({
  password: userPassword,
  email: userEmail,
  name: userName,
  birthDate: userBirthDate,
});

export type SignUpRequest = z.infer<typeof signUpValidationSchema>;

export type SignUpResponse = null;
