import { z } from 'zod';
import { userId } from '../user';
import { fileValidationSchema } from './file.validation';

export const generateSignatureValidationSchema = z.object({
  userId,
});

export type GenerateSignatureRequest = z.infer<
  typeof generateSignatureValidationSchema
>;

export const generateSignatureResponseValidationSchema = z.object({
  metadata: z.object({
    signature: z.string(),
    unixExpirationTime: z.number(),
    libraryId: z.string(),
    videoId: z.string().uuid(),
  }),
  file: fileValidationSchema,
});

export type GenerateSignatureResponse = z.infer<
  typeof generateSignatureResponseValidationSchema
>;
