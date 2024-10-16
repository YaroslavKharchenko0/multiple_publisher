import { createPublicationFilesValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreatePublicationFilesDto extends createZodDto(
  createPublicationFilesValidationSchema.omit({
    publicationId: true,
    isOriginal: true,
  }),
) { }

