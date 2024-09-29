import { verifyEmailValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class VerifyEmailBodyDto extends createZodDto(
  verifyEmailValidationSchema,
) { }
