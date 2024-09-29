import { publishPublicationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class PublishPublicationDto extends createZodDto(
  publishPublicationValidationSchema.omit({
    publicationId: true,
    postId: true,
  }),
) { }
