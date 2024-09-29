import { googleCallbackRequestSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class GoogleCallbackRequestDto extends createZodDto(
  googleCallbackRequestSchema,
) { }

