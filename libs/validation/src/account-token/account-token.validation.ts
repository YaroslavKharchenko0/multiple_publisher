import { z } from 'zod';;
import { accountId } from '../account/account.validation';
import { AccountTokenType } from '@app/types';

export const accountTokenType = z.nativeEnum(AccountTokenType);
export const accountTokenId = z.number();
export const accountToken = z.string();

export const accountTokenValidationSchema = z.object({
  id: accountTokenId,
  accountId,
  token: accountToken,
  type: accountTokenType,
  createdAt: z.date(),
});

export type AccountToken = z.infer<typeof accountTokenValidationSchema>;
