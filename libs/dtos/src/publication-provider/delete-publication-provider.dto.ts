import { deletePublicationProviderValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeletePublicationProviderDto extends createZodDto(
  deletePublicationProviderValidationSchema,
) { }
