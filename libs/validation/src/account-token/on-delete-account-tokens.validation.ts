import { z } from 'zod';
import { accountId } from '../account/account.validation';

export const onDeleteAccountTokensValidationSchema = z.object({
  accountId,
});

export type OnDeleteAccountTokensRequest = z.infer<
  typeof onDeleteAccountTokensValidationSchema
>;


export type OnDeleteAccountTokensResponse = null;
