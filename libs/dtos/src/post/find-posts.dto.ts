import { paginationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindPostsBodyDto extends createZodDto(
  paginationValidationSchema,
) { }
