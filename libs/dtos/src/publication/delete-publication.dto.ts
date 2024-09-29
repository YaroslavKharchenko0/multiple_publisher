import { deletePublicationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeletePublicationDto extends createZodDto(
  deletePublicationValidationSchema,
) { }

