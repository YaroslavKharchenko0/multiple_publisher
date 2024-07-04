import { RmqErrorService } from "@app/errors";
import { Provider } from "@nestjs/common";
import { WorkspaceRoleRepository } from "../repositories/worksoace-role.repository";
import { WorkspaceRoleService } from "../services/workspace-role.service";

export const WORKSPACE_ROLE_SERVICE = 'WORKSPACE_ROLE_SERVICE';
export const WORKSPACE_ROLE_REPOSITORY = 'WORKSPACE_ROLE_REPOSITORY';

export const workspaceRoleServiceProvider: Provider = {
  provide: WORKSPACE_ROLE_SERVICE,
  useFactory: (repository: WorkspaceRoleRepository, rmqErrorService: RmqErrorService) => {
    return new WorkspaceRoleService(repository, rmqErrorService);
  },
  inject: [WORKSPACE_ROLE_REPOSITORY, RmqErrorService],
};

export const workspaceRoleRepositoryProvider: Provider = {
  provide: WORKSPACE_ROLE_REPOSITORY,
  useClass: WorkspaceRoleRepository,
};
