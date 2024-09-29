import { findFileMetadataByFileIdBodyValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindFileMetadataByFileIdBodyDto extends createZodDto(findFileMetadataByFileIdBodyValidationSchema) { }

