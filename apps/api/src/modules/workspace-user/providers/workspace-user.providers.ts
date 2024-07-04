import { Provider } from "@nestjs/common";
import { WorkspaceUserRepository } from "../repositories/workspace-user.repository";

export const WORKSPACE_USER_REPOSITORY = 'WORKSPACE_USER_REPOSITORY';

export const workspaceUserRepositoryProvider: Provider = {
  provide: WORKSPACE_USER_REPOSITORY,
  useValue: WorkspaceUserRepository
}
