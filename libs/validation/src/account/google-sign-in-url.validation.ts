import { z } from 'nestjs-zod/z'
import { userId } from '../user'
import { createZodDto } from 'nestjs-zod'

export const googleSingInUrlRequestSchema = z.object({
  userId,
}).required()

export const googleSingInUrl = z.string().url()

export type GoogleSingInUrlRequest = z.infer<typeof googleSingInUrlRequestSchema>

export class GoogleSingInUrlRequestDto extends createZodDto(googleSingInUrlRequestSchema) { }

export const googleSingInUrlResponseSchema = z.object({
  url: googleSingInUrl
}).required()

export type GoogleSingInUrlResponse = z.infer<typeof googleSingInUrlResponseSchema>

export class GoogleSingInUrlResponseDto extends createZodDto(googleSingInUrlResponseSchema) { }
