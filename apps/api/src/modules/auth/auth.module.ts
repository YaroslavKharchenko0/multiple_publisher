import { RmqModule } from "@app/rmq";
import { Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { CommandController } from "./controllers/command.controller";

@Module({})
export class AuthModule {
  static forRoot() {
    return {
      module: AuthModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController]
    };
  }
}
