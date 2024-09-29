import { createPublicationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreatePublicationDto extends createZodDto(
  createPublicationValidationSchema.omit({ postId: true }),
) { }

