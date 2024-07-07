import { z } from 'nestjs-zod/z'
import { File, filePath, fileProviderId, fileType, fileUploadStatus } from './file.validation'
import { userId } from '../user'
import { createZodDto } from 'nestjs-zod'

export const createFileValidationSchema = z.object({
  providerId: fileProviderId,
  type: fileType,
  authorId: userId,
  uploadStatus: fileUploadStatus,
  path: filePath,
})

export type CreateFileRequest = z.infer<typeof createFileValidationSchema>

export class CreateFileBodyDto extends createZodDto(createFileValidationSchema) { }

export type CreateFileResponse = File
