import { findPublicationProviderValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindPublicationProviderDto extends createZodDto(
  findPublicationProviderValidationSchema,
) { }
