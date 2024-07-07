import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { fileId } from '../file/file.validation'
import { FileMetadata } from './file-metadata.validation'

export const createFileMetadata = z.object({
  key: z.string(),
  value: z.string(),
  fileId,
})

export type CreateFileMetadataRequest = z.infer<typeof createFileMetadata>

export const createFileMetadataBody = createFileMetadata.omit({ fileId: true })

export class CreateFileMetadataBodyDto extends createZodDto(createFileMetadataBody) { }

export type CreateFileMetadataResponse = FileMetadata
