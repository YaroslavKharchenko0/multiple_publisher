import { z } from 'zod';
import { Account, accountId } from './account.validation';

export const deleteAccountValidationSchema = z.object({
  id: accountId,
});

export type DeleteAccountRequest = z.infer<
  typeof deleteAccountValidationSchema
>;

export type DeleteAccountResponse = Account;
