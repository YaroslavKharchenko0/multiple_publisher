import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'


export const onWebhookValidationSchema = z.object({
  VideoLibraryId: z.number(),
  VideoGuid: z.string().uuid(),
  Status: z.number(),
})

export type OnWebhookRequest = z.infer<typeof onWebhookValidationSchema>

export class OnWebhookBodyDto extends createZodDto(onWebhookValidationSchema) { }

export type OnWebhookResponse = null
