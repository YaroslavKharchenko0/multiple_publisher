
import { fileMetadataValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FileMetadataDto extends createZodDto(fileMetadataValidationSchema) { }
