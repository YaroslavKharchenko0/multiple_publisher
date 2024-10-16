import { createAccountTokenValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateAccountTokenBodyDto extends createZodDto(
  createAccountTokenValidationSchema,
) { }
