import { updateUserRoleBodyDtoValidation } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class UpdateUserRoleBodyDto extends createZodDto(
  updateUserRoleBodyDtoValidation,
) { }
