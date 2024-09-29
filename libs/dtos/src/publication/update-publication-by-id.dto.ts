import { updatePublicationByIdValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class UpdatePublicationByIdDto extends createZodDto(
  updatePublicationByIdValidationSchema,
) { }
