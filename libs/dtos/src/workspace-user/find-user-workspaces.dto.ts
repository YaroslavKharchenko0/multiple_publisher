import { paginationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindUserWorkspacesDto extends createZodDto(
  paginationValidationSchema
) { }
