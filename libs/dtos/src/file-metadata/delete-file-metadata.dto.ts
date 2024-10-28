import { deleteFileMetadata } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeleteFileMetadataBodyDto extends createZodDto(
  deleteFileMetadata,
) { }
