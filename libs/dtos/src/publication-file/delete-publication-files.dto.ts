import { deletePublicationFilesValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeletePublicationFilesDto extends createZodDto(
  deletePublicationFilesValidationSchema,
) { }
