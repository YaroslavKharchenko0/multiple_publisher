import { deleteRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeleteRoleBodyDto extends createZodDto(
  deleteRoleValidationSchema,
) { }
