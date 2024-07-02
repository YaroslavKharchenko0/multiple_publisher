import { RmqModule } from "@app/rmq";
import { Module } from "@nestjs/common";
import { AdminApiController } from "./controllers/admin-api.controller";
import { CommandController } from "./controllers/command.controller";
import { QueryController } from "./controllers/query.controller";

@Module({})
export class RolesModule {
  static forRoot() {
    return {
      module: RolesModule,
      imports: [RmqModule.forRoot()],
      controllers: [AdminApiController, CommandController, QueryController]
    };
  }
}
