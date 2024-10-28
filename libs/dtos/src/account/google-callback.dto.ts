import { googleCallbackRequestSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class GoogleCallbackRequestDto extends createZodDto(
  googleCallbackRequestSchema,
) { }

