import { paginationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindUserPostsBodyDto extends createZodDto(
  paginationValidationSchema,
) { }
