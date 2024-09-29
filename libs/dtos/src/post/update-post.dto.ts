import { updatePostPayloadValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class UpdatePostBodyDto extends createZodDto(
  updatePostPayloadValidationSchema,
) { }
