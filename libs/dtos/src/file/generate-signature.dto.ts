import { generateSignatureValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class GenerateSignatureBodyDto extends createZodDto(
  generateSignatureValidationSchema,
) { }
