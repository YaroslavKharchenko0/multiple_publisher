import { fileValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FileDto extends createZodDto(fileValidationSchema) { }
