import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AccountAccessGuard } from '../guards/account-access.guard';

export const ACCOUNT_ACCESS_KEY = 'ACCOUNT_ACCESS_KEY';

export const AccountAccess = () => {
  return applyDecorators(
    SetMetadata(ACCOUNT_ACCESS_KEY, true),
    UseGuards(AccountAccessGuard),
  );
};
