import { publicationFileValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class PublicationFileDto extends createZodDto(
  publicationFileValidationSchema,
) { }
