import { createUserValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateUserBodyDto extends createZodDto(
  createUserValidationSchema,
) { }
