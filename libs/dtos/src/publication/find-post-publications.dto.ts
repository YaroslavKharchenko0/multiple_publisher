import { paginationValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindPostPublicationsDto extends createZodDto(
  paginationValidationSchema,
) { }
