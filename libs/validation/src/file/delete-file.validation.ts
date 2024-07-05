import { z } from 'nestjs-zod/z'
import { File, fileId } from './file.validation'
import { createZodDto } from 'nestjs-zod'
import { userId } from '../user'

export const deleteFileValidationSchema = z.object({
  id: fileId,
  userId: userId.optional(),
})

export type DeleteFileRequest = z.infer<typeof deleteFileValidationSchema>

export class DeleteFileBodyDto extends createZodDto(deleteFileValidationSchema) { }

export type DeleteFileResponse = File
