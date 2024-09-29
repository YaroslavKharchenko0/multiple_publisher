import { findPublicationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';


export class FindPublicationDto extends createZodDto(
  findPublicationValidationSchema,
) { }
