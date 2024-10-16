import { createPublicationProviderValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreatePublicationProviderDto extends createZodDto(
  createPublicationProviderValidationSchema,
) { }
