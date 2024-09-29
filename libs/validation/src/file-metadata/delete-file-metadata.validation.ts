import { z } from 'zod'
import { FileMetadata, fileMetadataId } from './file-metadata.validation'

export const deleteFileMetadata = z.object({
  id: fileMetadataId,
})

export type DeleteFileMetadataRequest = z.infer<typeof deleteFileMetadata>

export type DeleteFileMetadataResponse = FileMetadata
