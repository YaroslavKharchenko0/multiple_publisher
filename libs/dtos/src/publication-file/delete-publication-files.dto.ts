import { deletePublicationFilesValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeletePublicationFilesDto extends createZodDto(
  deletePublicationFilesValidationSchema,
) { }
