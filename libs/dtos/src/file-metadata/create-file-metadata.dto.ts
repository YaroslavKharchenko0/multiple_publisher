import { createFileMetadataBody } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class CreateFileMetadataBodyDto extends createZodDto(createFileMetadataBody) { }
