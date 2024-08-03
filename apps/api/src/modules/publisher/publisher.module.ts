import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { PublisherService } from './services/publisher.service';
import { BullMQModule } from '@app/bull-mq';
import { PublisherQueue } from '@app/jobs';
import { PublishPublicationProcessor } from './processors';

@Module({})
export class PublisherModule {
  static forRoot(): DynamicModule {
    return {
      module: PublisherModule,
      imports: [
        RmqModule.forRoot(),
        BullMQModule.forRoot(),
        BullMQModule.registerQueues(PublisherQueue.queueName),
      ],
      controllers: [ApiController, CommandController],
      providers: [PublisherService, PublishPublicationProcessor],
    };
  }
}
