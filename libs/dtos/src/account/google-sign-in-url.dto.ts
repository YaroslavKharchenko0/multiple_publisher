import { createZodDto } from 'nestjs-zod';
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
