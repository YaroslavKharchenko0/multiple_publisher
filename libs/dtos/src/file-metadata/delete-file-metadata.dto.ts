import { deleteFileMetadata } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeleteFileMetadataBodyDto extends createZodDto(
  deleteFileMetadata,
) { }
