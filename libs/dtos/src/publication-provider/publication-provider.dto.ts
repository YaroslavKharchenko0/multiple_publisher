import { publicationProviderValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class PublicationProviderDto extends createZodDto(
  publicationProviderValidationSchema,
) { }
