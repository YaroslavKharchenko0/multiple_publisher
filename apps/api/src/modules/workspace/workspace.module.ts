import { RmqModule } from "@app/rmq";
import { Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { CommandController } from "./controllers/command.controller";
import { QueryController } from "./controllers/query.controller";
import { WORKSPACE_SERVICE, WORKSPACE_REPOSITORY, workspaceServiceProvider, workspaceRepositoryProvider } from "./providers/workspace.providers";

@Module({})
export class WorkspaceModule {
  static forRoot() {
    return {
      module: WorkspaceModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController, QueryController],
      providers: [workspaceServiceProvider, workspaceRepositoryProvider],
      exports: [WORKSPACE_SERVICE, WORKSPACE_REPOSITORY],
    };
  }
}
