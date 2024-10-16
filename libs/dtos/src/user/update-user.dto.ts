import { updateUserBodyValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class UpdateUserBodyDto extends createZodDto(
  updateUserBodyValidationSchema,
) { }
