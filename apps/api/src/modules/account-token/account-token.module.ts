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

@Module({})
export class AccountTokenModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountTokenModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController, QueryController],
      providers: [accountTokenRepositoryProvider, accountTokenServiceProvider],
      exports: [ACCOUNT_TOKEN_REPOSITORY, ACCOUNT_TOKEN_SERVICE],
    };
  }
}
