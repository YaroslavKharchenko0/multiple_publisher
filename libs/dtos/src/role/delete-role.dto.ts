import { deleteRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeleteRoleBodyDto extends createZodDto(
  deleteRoleValidationSchema,
) { }
