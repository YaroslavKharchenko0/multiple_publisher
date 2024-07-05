import { z } from 'nestjs-zod/z'
import { File } from './file.validation'
import { createZodDto } from 'nestjs-zod'
import { userId } from '../user'
import { paginationValidationSchema } from '../common'

export const findUserFilesValidationSchema = z.object({
  userId,
  pagination: paginationValidationSchema,
})

export type FindUserFilesRequest = z.infer<typeof findUserFilesValidationSchema>

export class FindUserFilesBodyDto extends createZodDto(findUserFilesValidationSchema) { }

export type FindUserFilesResponse = File[]
