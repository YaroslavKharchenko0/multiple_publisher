import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import {
  ACCOUNT_TOKEN_REPOSITORY,
  ACCOUNT_TOKEN_SERVICE,
  accountTokenRepositoryProvider,
  accountTokenServiceProvider,
} from './providers/account-token.providers';
import { BullMQModule } from '@app/bull-mq';
import { AccountTokenQueue } from '@app/jobs';
import { RefreshTokenProcessor } from './processors';
import { EventController } from './controllers/event.controller';
import { GcpModule } from '@app/gcp';

@Module({})
export class AccountTokenModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountTokenModule,
      imports: [
        RmqModule.forRoot(),
        GcpModule.forRoot(),
        BullMQModule.forRoot(),
        BullMQModule.registerQueues(AccountTokenQueue.queueName),
      ],
      controllers: [
        ApiController,
        CommandController,
        QueryController,
        EventController,
      ],
      providers: [
        accountTokenRepositoryProvider,
        accountTokenServiceProvider,
        RefreshTokenProcessor,
      ],
      exports: [ACCOUNT_TOKEN_REPOSITORY, ACCOUNT_TOKEN_SERVICE],
    };
  }
}
