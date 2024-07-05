import { z } from 'nestjs-zod/z'
import { File, fileProviderId, fileType, fileUploadStatus } from './file.validation'
import { userId } from '../user'
import { createZodDto } from 'nestjs-zod'

export const updateFileValidationSchema = z.object({
  providerId: fileProviderId,
  type: fileType,
  authorId: userId,
  uploadStatus: fileUploadStatus,
})

export type UpdateFileRequest = z.infer<typeof updateFileValidationSchema>

export class UpdateFileBodyDto extends createZodDto(updateFileValidationSchema) { }

export type UpdateFileResponse = File
