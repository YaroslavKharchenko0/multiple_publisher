import { findPublicationValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';


export class FindPublicationDto extends createZodDto(
  findPublicationValidationSchema,
) { }
