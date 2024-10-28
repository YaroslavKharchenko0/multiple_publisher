import { z } from 'zod';
import { userId } from '../user';
import { accountId } from './account.validation';

export const googleSingInUrlRequestSchema = z
  .object({
    userId,
    accountId,
  })
  .required();

export const googleSingInUrl = z.string().url();

export type GoogleSingInUrlRequest = z.infer<
  typeof googleSingInUrlRequestSchema
>;

export const googleSingInUrlResponseSchema = z
  .object({
    url: googleSingInUrl,
  })
  .required();

export type GoogleSingInUrlResponse = z.infer<
  typeof googleSingInUrlResponseSchema
>;
