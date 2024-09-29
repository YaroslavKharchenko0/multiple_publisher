import { fileValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FileDto extends createZodDto(fileValidationSchema) { }
