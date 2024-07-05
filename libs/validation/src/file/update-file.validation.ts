import { z } from 'nestjs-zod/z'
import { File, fileId, fileProviderId, fileType, fileUploadStatus } from './file.validation'
import { userId } from '../user'
import { createZodDto } from 'nestjs-zod'

export const updateFileValidationSchema = z.object({
  id: fileId,
  providerId: fileProviderId,
  type: fileType,
  authorId: userId,
  uploadStatus: fileUploadStatus,
})

export type UpdateFileRequest = z.infer<typeof updateFileValidationSchema>

export class UpdateFileBodyDto extends createZodDto(updateFileValidationSchema) { }

export type UpdateFileResponse = File
