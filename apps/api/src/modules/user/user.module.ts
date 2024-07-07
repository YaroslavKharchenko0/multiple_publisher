import { RmqModule } from "@app/rmq";
import { DynamicModule, Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { QueryController } from "./controllers/query.controller";
import { CommandController } from "./controllers/command.controller";
import { AdminApiController } from "./controllers/admin-api.controller";
import { EventController } from "./controllers/event.controller";
import { USER_REPOSITORY, USER_SERVICE, userRepositoryProvider, userServiceProvider } from "./providers/user.service.provider";

@Module({})
export class UserModule {
  static forRoot(): DynamicModule {
    return {
      module: UserModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, AdminApiController, QueryController, CommandController, EventController],
      providers: [
        userRepositoryProvider,
        userServiceProvider,
      ],
      exports: [USER_REPOSITORY, USER_SERVICE]
    };
  }
}
