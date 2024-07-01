import { RmqModule } from "@app/rmq";
import { DynamicModule, Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { CommandController } from "./controllers/command.controller";
import { AWSModule, COGNITO_SERVICE, CognitoService } from "@app/aws";
import { AuthService } from "./services/auth.service";
import { AUTH_SERVICE } from "./constants";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [RmqModule.forRoot(), AWSModule.forRoot()],
      controllers: [ApiController, CommandController],
      providers: [
        {
          provide: AUTH_SERVICE,
          useFactory: (cognitoService: CognitoService, amqpConnection: AmqpConnection) => {
            return new AuthService(cognitoService, amqpConnection);
          },
          inject: [COGNITO_SERVICE, AmqpConnection],
        }
      ],
    };
  }
}
