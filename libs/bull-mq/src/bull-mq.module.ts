import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { createBullMqConfig } from './bull-mq.config';

@Module({})
export class BullMQModule {
  static forRoot() {
    return {
      module: BullMQModule,
      providers: [BullModule.forRootAsync(createBullMqConfig())],
      exports: [BullModule],
    };
  }
}
