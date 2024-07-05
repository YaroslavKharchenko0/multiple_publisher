import { z } from 'nestjs-zod/z'
import { File } from './file.validation'
import { createZodDto } from 'nestjs-zod'
import { userId } from '../user'

export const findUserFilesValidationSchema = z.object({
  userId
})

export type FindUserFilesRequest = z.infer<typeof findUserFilesValidationSchema>

export class FindUserFilesBodyDto extends createZodDto(findUserFilesValidationSchema) { }

export type FindUserFilesResponse = File[]
