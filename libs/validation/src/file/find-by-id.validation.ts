import { z } from 'nestjs-zod/z'
import { File, fileId } from './file.validation'
import { createZodDto } from 'nestjs-zod'

export const findFileByIdValidationSchema = z.object({
  id: fileId,
})

export type FindFileByIdRequest = z.infer<typeof findFileByIdValidationSchema>

export class FindFileByIdBodyDto extends createZodDto(findFileByIdValidationSchema) { }

export type FindFileByIdResponse = File
