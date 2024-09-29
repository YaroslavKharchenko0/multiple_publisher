import { createAccountValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreateAccountBodyDto extends createZodDto(
  createAccountValidationSchema,
) { }
