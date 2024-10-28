import { findPublicationByIdValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindPublicationByIdDto extends createZodDto(
  findPublicationByIdValidationSchema,
) { }
