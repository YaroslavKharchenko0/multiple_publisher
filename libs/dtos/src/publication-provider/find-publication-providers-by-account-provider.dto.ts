import { findPublicationProvidersByAccountProviderValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindPublicationProvidersByAccountProviderDto extends createZodDto(
  findPublicationProvidersByAccountProviderValidationSchema,
) { }
