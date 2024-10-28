import { createPublicationValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreatePublicationDto extends createZodDto(
  createPublicationValidationSchema.omit({ postId: true }),
) { }

