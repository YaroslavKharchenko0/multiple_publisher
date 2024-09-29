import { findPublicationProvidersByAccountProviderValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindPublicationProvidersByAccountProviderDto extends createZodDto(
  findPublicationProvidersByAccountProviderValidationSchema,
) { }
