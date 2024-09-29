import { updateFileBodyValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class UpdateFileBodyDto extends createZodDto(
  updateFileBodyValidationSchema,
) { }
