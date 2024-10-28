import { paginationValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindUserWorkspacesDto extends createZodDto(
  paginationValidationSchema
) { }
