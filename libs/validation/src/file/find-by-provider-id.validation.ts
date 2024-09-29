import { z } from 'zod';
import { File, fileProviderId } from './file.validation';

export const findFileByProviderIdValidationSchema = z.object({
  providerId: fileProviderId,
});

export type FindFileByProviderIdRequest = z.infer<
  typeof findFileByProviderIdValidationSchema
>;

export type FindFileByProviderIdResponse = File;
