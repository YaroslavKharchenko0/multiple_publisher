import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import {
  ACCOUNT_REPOSITORY,
  ACCOUNT_SERVICE,
  accountRepositoryProvider,
  accountServiceProvider,
} from './providers/account.providers';
import { GcpModule } from '@app/gcp';

@Module({})
export class AccountModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountModule,
      imports: [RmqModule.forRoot(), GcpModule.forRoot()],
      controllers: [ApiController, CommandController, QueryController],
      providers: [accountRepositoryProvider, accountServiceProvider],
      exports: [ACCOUNT_SERVICE, ACCOUNT_REPOSITORY],
    };
  }
}
