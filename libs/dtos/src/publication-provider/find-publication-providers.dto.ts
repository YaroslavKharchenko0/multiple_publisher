import { paginationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindPublicationProvidersDto extends createZodDto(
  paginationValidationSchema,
) { }
