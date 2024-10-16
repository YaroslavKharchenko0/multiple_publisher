import { publicationProviderValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class PublicationProviderDto extends createZodDto(
  publicationProviderValidationSchema,
) { }
