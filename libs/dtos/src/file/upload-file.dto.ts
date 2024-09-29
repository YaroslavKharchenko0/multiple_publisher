import { uploadFileValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class UploadFileBodyDto extends createZodDto(
  uploadFileValidationSchema,
) { }
