import { deletePublicationValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeletePublicationDto extends createZodDto(
  deletePublicationValidationSchema,
) { }

