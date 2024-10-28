import { findPublicationProviderByIdValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindPublicationProviderByIdDto extends createZodDto(
  findPublicationProviderByIdValidationSchema,
) { }
