import { createPublicationProviderValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreatePublicationProviderDto extends createZodDto(
  createPublicationProviderValidationSchema,
) { }
