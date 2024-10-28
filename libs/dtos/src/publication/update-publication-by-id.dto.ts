import { updatePublicationByIdValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class UpdatePublicationByIdDto extends createZodDto(
  updatePublicationByIdValidationSchema,
) { }
