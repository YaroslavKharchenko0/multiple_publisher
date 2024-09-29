import { findPublicationProviderValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindPublicationProviderDto extends createZodDto(
  findPublicationProviderValidationSchema,
) { }
