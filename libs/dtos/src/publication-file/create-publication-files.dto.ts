import { createPublicationFilesValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreatePublicationFilesDto extends createZodDto(
  createPublicationFilesValidationSchema.omit({
    publicationId: true,
    isOriginal: true,
  }),
) { }

