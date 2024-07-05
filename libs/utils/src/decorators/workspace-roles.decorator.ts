import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Auth } from './auth.decorator';
import { WorkspaceRoleGuard } from '../guards';
import { WorkspaceRole } from '@app/types';

export const WORKSPACE_ROLES_DECORATOR_KEY = 'WORKSPACE_ROLES_DECORATOR_KEY'

export const WorkspaceRoles = (...roles: WorkspaceRole[]) => {
  return applyDecorators(
    SetMetadata(WORKSPACE_ROLES_DECORATOR_KEY, roles),
    Auth(),
    UseGuards(WorkspaceRoleGuard),
  );
};
