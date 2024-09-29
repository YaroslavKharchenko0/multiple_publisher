
import { fileMetadataValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FileMetadataDto extends createZodDto(fileMetadataValidationSchema) { }
