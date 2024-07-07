import { FileType, UploadStatus } from '@app/types'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { userId } from '../user'

export const fileId = z.number()
export const fileProviderId = z.string().uuid().nullable()
export const fileType = z.nativeEnum(FileType)
export const fileUploadStatus = z.nativeEnum(UploadStatus).nullable()
export const filePath = z.string().nullable()


export const fileValidationSchema = z.object({
  id: fileId,
  providerId: fileProviderId,
  type: fileType,
  uploadStatus: fileUploadStatus,
  authorId: userId,
  createdAt: z.date(),
  path: filePath,
})

export type File = z.infer<typeof fileValidationSchema>

export class FileDto extends createZodDto(fileValidationSchema) { }
