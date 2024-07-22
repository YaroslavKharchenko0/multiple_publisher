import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import { AdminApiController } from './controllers/admin-api.controller';
import {
  workspaceRoleServiceProvider,
  workspaceRoleRepositoryProvider,
  WORKSPACE_ROLE_REPOSITORY,
  WORKSPACE_ROLE_SERVICE,
} from './providers/workspace-role.providers';

@Module({})
export class WorkspaceRoleModule {
  static forRoot(): DynamicModule {
    return {
      module: WorkspaceRoleModule,
      imports: [RmqModule.forRoot()],
      controllers: [AdminApiController, CommandController, QueryController],
      providers: [
        workspaceRoleServiceProvider,
        workspaceRoleRepositoryProvider,
      ],
      exports: [WORKSPACE_ROLE_SERVICE, WORKSPACE_ROLE_REPOSITORY],
    };
  }
}
