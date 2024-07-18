import { DynamicModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { createBullMqConfig } from './bull-mq.config';

@Module({})
export class BullMQModule {
  static forRoot(): DynamicModule {
    return {
      module: BullMQModule,
      imports: [BullModule.forRootAsync(createBullMqConfig())],
      exports: [BullModule],
    };
  }

  static registerQueues(...queues: string[]): DynamicModule {
    const queueOptions = queues.map((queue) => ({ name: queue }));

    return {
      module: BullMQModule,
      imports: [BullModule.registerQueue(...queueOptions)],
      exports: [BullModule],
    };
  }
}
