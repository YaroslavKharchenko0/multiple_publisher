import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z'
import { userEmail, userProviderId, userName, userBirthDate, User } from './user.validation';

export const createUserValidationSchema = z.object({
  email: userEmail,
  providerId: userProviderId,
  name: userName,
  birthDate: userBirthDate,
})

export type CreateUserRequest = z.infer<typeof createUserValidationSchema>

export class CreateUserBodyDto extends createZodDto(createUserValidationSchema) { }

export type CreateUserResponse = User;
