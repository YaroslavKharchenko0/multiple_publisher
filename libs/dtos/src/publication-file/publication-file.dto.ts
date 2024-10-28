import { publicationFileValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class PublicationFileDto extends createZodDto(
  publicationFileValidationSchema,
) { }
