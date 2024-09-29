import { findPublicationProviderByIdValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindPublicationProviderByIdDto extends createZodDto(
  findPublicationProviderByIdValidationSchema,
) { }
