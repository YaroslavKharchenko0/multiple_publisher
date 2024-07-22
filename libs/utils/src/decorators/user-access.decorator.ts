import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Auth } from './auth.decorator';
import { UserAccessGuard } from '../guards/user-access.guard';

export const USER_ACCESS_KEY = 'USER_ACCESS_KEY';

export const UserAccess = () => {
  return applyDecorators(
    Auth(),
    SetMetadata(USER_ACCESS_KEY, true),
    UseGuards(UserAccessGuard),
  );
};
