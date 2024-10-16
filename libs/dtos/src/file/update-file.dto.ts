import { updateFileBodyValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class UpdateFileBodyDto extends createZodDto(
  updateFileBodyValidationSchema,
) { }
