import { Provider } from "@nestjs/common";
import { WorkspaceUserRepository } from "../repositories/workspace-user.repository";
import { WorkspaceUserService } from "../services/workspace-user.service";

export const WORKSPACE_USER_REPOSITORY = 'WORKSPACE_USER_REPOSITORY';
export const WORKSPACE_USER_SERVICE = 'WORKSPACE_USER_SERVICE';

export const workspaceUserRepositoryProvider: Provider = {
  provide: WORKSPACE_USER_REPOSITORY,
  useValue: WorkspaceUserRepository
}

export const workspaceUserServiceProvider: Provider = {
  provide: WORKSPACE_USER_SERVICE,
  useFactory: (repository: WorkspaceUserRepository) => {
    return new WorkspaceUserService(repository);
  },
  inject: [WORKSPACE_USER_REPOSITORY]
}
