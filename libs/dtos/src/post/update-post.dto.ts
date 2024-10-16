import { updatePostPayloadValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class UpdatePostBodyDto extends createZodDto(
  updatePostPayloadValidationSchema,
) { }
