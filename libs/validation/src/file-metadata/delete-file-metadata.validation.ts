import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { FileMetadata, fileMetadataId } from './file-metadata.validation'

export const deleteFileMetadata = z.object({
  id: fileMetadataId,
})

export type DeleteFileMetadataRequest = z.infer<typeof deleteFileMetadata>

export class DeleteFileMetadataBodyDto extends createZodDto(deleteFileMetadata) { }

export type DeleteFileMetadataResponse = FileMetadata
