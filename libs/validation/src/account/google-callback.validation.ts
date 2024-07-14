import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { userId } from '../user';

export const googleCallbackRequestSchema = z.object({
  code: z.string(),
  userId,
}).required()

export type GoogleCallbackRequest = z.infer<typeof googleCallbackRequestSchema>

export class GoogleCallbackRequestDto extends createZodDto(googleCallbackRequestSchema) { }

export type GoogleCallbackResponse = null;

