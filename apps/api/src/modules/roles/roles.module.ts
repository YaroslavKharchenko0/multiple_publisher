import { RmqModule } from "@app/rmq";
import { Module } from "@nestjs/common";
import { AdminApiController } from "./controllers/admin-api.controller";
import { CommandController } from "./controllers/command.controller";
import { QueryController } from "./controllers/query.controller";
import { roleServiceProvider, roleRepositoryProvider, ROLE_REPOSITORY, ROLE_SERVICE } from "./providers/role.providers";

@Module({})
export class RolesModule {
  static forRoot() {
    return {
      module: RolesModule,
      imports: [RmqModule.forRoot()],
      controllers: [AdminApiController, CommandController, QueryController],
      providers: [roleServiceProvider, roleRepositoryProvider],
      exports: [ROLE_SERVICE, ROLE_REPOSITORY],
    };
  }
}
