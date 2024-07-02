import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const paginationValidationSchema = z.object({
  offset: z.number().int().positive().optional().default(0),
  limit: z.number().int().positive().optional().default(10),
})

export type Pagination = z.infer<typeof paginationValidationSchema>

export class PaginationDto extends createZodDto(paginationValidationSchema) { }

