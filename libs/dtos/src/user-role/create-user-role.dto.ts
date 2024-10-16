import { createUserRoleBodyValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateUserRoleBodyDto extends createZodDto(
  createUserRoleBodyValidationSchema,
) { }
