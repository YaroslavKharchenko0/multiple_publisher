import { AccountStatus } from '@app/types';
import { z } from 'zod';
import { accountProviderKey } from '../account-provider';
import {
  Account,
  accountName,
  accountStatus,
  accountUserId,
} from './account.validation';

export const createAccountValidationSchema = z.object({
  provider: accountProviderKey,
  name: accountName,
  userId: accountUserId,
  status: accountStatus.default(AccountStatus.INACTIVE),
});

export type CreateAccountRequest = z.infer<
  typeof createAccountValidationSchema
>;

export const createAccountBodyValidationSchema =
  createAccountValidationSchema.pick({ name: true, provider: true });

export type CreateAccountBodyRequest = z.infer<
  typeof createAccountBodyValidationSchema
>;

export type CreateAccountResponse = Account;
