import { deletePublicationProviderValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeletePublicationProviderDto extends createZodDto(
  deletePublicationProviderValidationSchema,
) { }
