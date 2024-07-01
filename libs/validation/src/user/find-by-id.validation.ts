import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { User, userId } from './user.validation'

export const findByIdValidationSchema = z.object({
  id: userId,
})

export type FindByIdRequest = z.infer<typeof findByIdValidationSchema>

export class FindByIdBodyDto extends createZodDto(findByIdValidationSchema) { }

export type FindByIdResponse = User;
