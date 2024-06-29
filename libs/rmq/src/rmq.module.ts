import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { createConfigFactory } from "./config.factory";

@Module({})
export class RmqModule {
  static forRoot() {
    return {
      module: RmqModule,
      imports: [RabbitMQModule.forRootAsync(RabbitMQModule, {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const config = createConfigFactory(configService);

          return config;
        }
      })],
      provides: [RabbitMQModule],
      exports: [RabbitMQModule]
    };
  }
}
