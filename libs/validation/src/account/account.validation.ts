import { AccountStatus } from '@app/types';
import { z } from 'zod';
import { userId } from '../user';
import { accountProviderId } from '../account-provider';

export const accountId = z.number().describe('Account id');
export const accountName = z.string().max(100).describe('Account name');
export const accountStatus = z
  .nativeEnum(AccountStatus)
  .describe('Account status');
export const accountUserId = userId.nullable().describe('Account user id');
export const accountInternalId = z.string().describe('Account internal id');

export const accountValidationSchema = z.object({
  id: accountId,
  name: accountName,
  userId: accountUserId,
  internalId: accountInternalId,
  providerId: accountProviderId,
  createdAt: z.date(),
  updatedAt: z.date(),
  status: accountStatus,
});

export type Account = z.infer<typeof accountValidationSchema>;
