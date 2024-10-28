import { publishPublicationValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class PublishPublicationDto extends createZodDto(
  publishPublicationValidationSchema.omit({
    publicationId: true,
    postId: true,
  }),
) { }
