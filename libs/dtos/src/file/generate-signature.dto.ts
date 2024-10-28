import { generateSignatureValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class GenerateSignatureBodyDto extends createZodDto(
  generateSignatureValidationSchema,
) { }
