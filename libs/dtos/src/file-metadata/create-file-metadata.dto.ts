import { createFileMetadataBody } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class CreateFileMetadataBodyDto extends createZodDto(createFileMetadataBody) { }
