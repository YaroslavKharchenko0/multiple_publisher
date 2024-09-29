import { ProviderKey } from '@app/types';
import { z } from 'zod';

export const accountProviderKey = z
  .nativeEnum(ProviderKey)
  .describe('Account provider key');

export const accountProviderId = z.number().describe('Account provider id');

export const accountProviderValidationSchema = z.object({
  id: accountProviderId,
  key: accountProviderKey,
});

export type AccountProvider = z.infer<typeof accountProviderValidationSchema>;
