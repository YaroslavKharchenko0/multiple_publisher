import { createZodDto } from '@anatine/zod-nestjs';
import {
  googleSingInUrlRequestSchema,
  googleSingInUrlResponseSchema,
} from '@app/validation';

export class GoogleSingInUrlRequestDto extends createZodDto(
  googleSingInUrlRequestSchema,
) { }

export class GoogleSingInUrlResponseDto extends createZodDto(
  googleSingInUrlResponseSchema,
) { }
