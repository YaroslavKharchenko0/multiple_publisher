import { updateUserRoleBodyDtoValidation } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class UpdateUserRoleBodyDto extends createZodDto(
  updateUserRoleBodyDtoValidation,
) { }
