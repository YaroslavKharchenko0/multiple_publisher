import { createAccountValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateAccountBodyDto extends createZodDto(
  createAccountValidationSchema,
) { }
