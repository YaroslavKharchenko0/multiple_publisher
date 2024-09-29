import { createUserRoleBodyValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreateUserRoleBodyDto extends createZodDto(
  createUserRoleBodyValidationSchema,
) { }
