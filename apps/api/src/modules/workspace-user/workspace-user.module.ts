import { RmqModule } from "@app/rmq";
import { DynamicModule, Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { CommandController } from "./controllers/command.controller";
import { QueryController } from "./controllers/query.controller";
import { EventController } from "./controllers/event.controller";
import { workspaceUserServiceProvider, workspaceUserRepositoryProvider } from "./providers/workspace-user.providers";

@Module({})
export class WorkspaceUserModule {
  static forRoot(): DynamicModule {
    return {
      module: WorkspaceUserModule,
      imports: [RmqModule.forRoot()],
      providers: [workspaceUserServiceProvider, workspaceUserRepositoryProvider],
      controllers: [ApiController, CommandController, QueryController, EventController]
    };
  }
}
