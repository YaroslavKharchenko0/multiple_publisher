import { createAccountTokenValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreateAccountTokenBodyDto extends createZodDto(
  createAccountTokenValidationSchema,
) { }
