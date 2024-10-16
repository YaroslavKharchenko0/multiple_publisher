import { uploadFileValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class UploadFileBodyDto extends createZodDto(
  uploadFileValidationSchema,
) { }
