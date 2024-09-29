import { findPublicationByIdValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindPublicationByIdDto extends createZodDto(
  findPublicationByIdValidationSchema,
) { }
