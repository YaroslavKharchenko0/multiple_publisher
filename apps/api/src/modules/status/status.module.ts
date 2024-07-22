import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { DatabaseModule } from '../../database';
import { StatusService } from './services/status.service';

@Module({})
export class StatusModule {
  static forRoot(): DynamicModule {
    return {
      module: StatusModule,
      imports: [RmqModule.forRoot(), DatabaseModule.forRoot()],
      controllers: [ApiController],
      providers: [StatusService],
    };
  }
}
