import { z } from 'nestjs-zod/z';
import { accountId } from '../account/account.validation';
import { createZodDto } from 'nestjs-zod';

export const onDeleteAccountTokensValidationSchema = z.object({
  accountId,
});

export type OnDeleteAccountTokensRequest = z.infer<
  typeof onDeleteAccountTokensValidationSchema
>;

export class OnDeleteAccountTokensBodyDto extends createZodDto(
  onDeleteAccountTokensValidationSchema,
) { }

export type OnDeleteAccountTokensResponse = null;
