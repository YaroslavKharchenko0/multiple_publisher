import { RmqModule } from "@app/rmq";
import { DynamicModule, Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { DatabaseModule } from "../../database";
import { HealthService } from "./services/health.service";

@Module({})
export class HealthModule {
  static forRoot(): DynamicModule {
    return {
      module: HealthModule,
      imports: [RmqModule.forRoot(), DatabaseModule.forRoot()],
      controllers: [ApiController],
      providers: [HealthService],
    };
  }
}
