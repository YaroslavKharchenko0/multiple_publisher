import { Role } from '@app/types';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Auth } from './auth.decorator';
import { RoleGuard } from '../guards/role.guard';

export const ROLES_DECORATOR_KEY = 'ROLES_DECORATOR_KEY'

export const Roles = (...roles: Role[]) => {
  return applyDecorators(
    SetMetadata(ROLES_DECORATOR_KEY, roles),
    Auth(),
    UseGuards(RoleGuard),
  );
};
