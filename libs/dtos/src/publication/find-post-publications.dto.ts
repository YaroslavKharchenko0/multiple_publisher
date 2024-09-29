import { paginationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindPostPublicationsDto extends createZodDto(
  paginationValidationSchema,
) { }
