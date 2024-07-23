import { AccountStatus } from '@app/types';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { userId } from '../user';
import { accountProviderId } from '../account-provider';

export const accountId = z.number();
export const accountName = z.string().max(100);
export const accountStatus = z.nativeEnum(AccountStatus);
export const accountUserId = userId.nullable();
export const accountInternalId = z.string();

const accountValidationSchema = z.object({
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

export class AccountDto extends createZodDto(accountValidationSchema) { }
