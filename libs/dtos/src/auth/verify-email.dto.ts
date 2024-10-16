import { verifyEmailValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class VerifyEmailBodyDto extends createZodDto(
  verifyEmailValidationSchema,
) { }
