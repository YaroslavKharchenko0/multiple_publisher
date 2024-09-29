import { createRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreateRoleBodyDto extends createZodDto(
  createRoleValidationSchema,
) { }
