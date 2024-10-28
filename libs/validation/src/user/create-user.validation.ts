import { z } from 'zod';
import {
  userEmail,
  userProviderId,
  userName,
  userBirthDate,
  User,
} from './user.validation';

export const createUserValidationSchema = z.object({
  email: userEmail,
  providerId: userProviderId,
  name: userName,
  birthDate: userBirthDate,
});

export type CreateUserRequest = z.infer<typeof createUserValidationSchema>;

export type CreateUserResponse = User;
