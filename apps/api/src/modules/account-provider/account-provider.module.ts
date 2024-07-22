import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import { AdminApiController } from './controllers/admin-api.controller';
import {
  accountProviderServiceProvider,
  accountProviderRepositoryProvider,
  ACCOUNT_PROVIDER_REPOSITORY,
  ACCOUNT_PROVIDER_SERVICE,
} from './providers/account-provider.providers';

@Module({})
export class AccountProviderModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountProviderModule,
      imports: [RmqModule.forRoot()],
      controllers: [
        AdminApiController,
        ApiController,
        CommandController,
        QueryController,
      ],
      providers: [
        accountProviderServiceProvider,
        accountProviderRepositoryProvider,
      ],
      exports: [ACCOUNT_PROVIDER_SERVICE, ACCOUNT_PROVIDER_REPOSITORY],
    };
  }
}
