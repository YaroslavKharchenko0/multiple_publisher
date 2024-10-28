import { createRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateRoleBodyDto extends createZodDto(
  createRoleValidationSchema,
) { }
