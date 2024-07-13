import { RmqModule } from "@app/rmq";
import { DynamicModule, Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { CommandController } from "./controllers/command.controller";
import { QueryController } from "./controllers/query.controller";
import { EventController } from "./controllers/event.controller";

@Module({})
export class AccountProviderModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountProviderModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController, QueryController, EventController]
    };
  }
}
