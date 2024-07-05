import { RmqModule } from "@app/rmq";
import { DynamicModule, Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { CommandController } from "./controllers/command.controller";
import { QueryController } from "./controllers/query.controller";
import { workspaceUserServiceProvider, workspaceUserRepositoryProvider, WORKSPACE_USER_REPOSITORY, WORKSPACE_USER_SERVICE } from "./providers/workspace-user.providers";

@Module({})
export class WorkspaceUserModule {
  static forRoot(): DynamicModule {
    return {
      module: WorkspaceUserModule,
      imports: [RmqModule.forRoot()],
      providers: [workspaceUserServiceProvider, workspaceUserRepositoryProvider],
      controllers: [ApiController, CommandController, QueryController],
      exports: [WORKSPACE_USER_REPOSITORY, WORKSPACE_USER_SERVICE]
    };
  }
}
