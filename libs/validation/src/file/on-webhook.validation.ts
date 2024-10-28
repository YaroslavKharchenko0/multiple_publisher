import { z } from 'zod';

export const onWebhookValidationSchema = z.object({
  VideoLibraryId: z.number(),
  VideoGuid: z.string().uuid(),
  Status: z.number(),
});

export type OnWebhookRequest = z.infer<typeof onWebhookValidationSchema>;

export type OnWebhookResponse = null;
