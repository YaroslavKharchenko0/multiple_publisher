import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { PublisherService } from './services/publisher.service';

@Module({})
export class PublisherModule {
  static forRoot(): DynamicModule {
    return {
      module: PublisherModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController],
      providers: [PublisherService],
    };
  }
}
