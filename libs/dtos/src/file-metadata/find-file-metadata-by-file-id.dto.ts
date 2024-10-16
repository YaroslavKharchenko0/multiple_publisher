import { findFileMetadataByFileIdBodyValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindFileMetadataByFileIdBodyDto extends createZodDto(findFileMetadataByFileIdBodyValidationSchema) { }

