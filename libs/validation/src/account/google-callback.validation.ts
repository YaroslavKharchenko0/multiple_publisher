import { z } from 'zod';

export const googleCallbackRequestSchema = z
  .object({
    code: z.string(),
    state: z.string(),
  })
  .required();

export type GoogleCallbackRequest = z.infer<typeof googleCallbackRequestSchema>;

export type GoogleCallbackResponse = null;
