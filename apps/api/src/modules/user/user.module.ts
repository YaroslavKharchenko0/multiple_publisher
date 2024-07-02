import { RmqModule } from "@app/rmq";
import { DynamicModule, Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { QueryController } from "./controllers/query.controller";
import { EventController } from "./controllers/event.controller";
import { USER_REPOSITORY, USER_SERVICE, userRepositoryProvider, userServiceProvider } from "./providers/user.service.provider";
import { CommandController } from "./controllers/command.controller";

@Module({})
export class UserModule {
  static forRoot(): DynamicModule {
    return {
      module: UserModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, QueryController, EventController, CommandController],
      providers: [
        userRepositoryProvider,
        userServiceProvider,
      ],
      exports: [USER_SERVICE, USER_REPOSITORY]
    };
  }
}
