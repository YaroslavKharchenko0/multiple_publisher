import { z } from 'nestjs-zod/z'
import { File, fileProviderId } from './file.validation'
import { createZodDto } from 'nestjs-zod'

export const findFileByProviderIdValidationSchema = z.object({
  providerId: fileProviderId,
})

export type FindFileByProviderIdRequest = z.infer<typeof findFileByProviderIdValidationSchema>

export class FindFileByProviderIdBodyDto extends createZodDto(findFileByProviderIdValidationSchema) { }

export type FindFileByProviderIdResponse = File
