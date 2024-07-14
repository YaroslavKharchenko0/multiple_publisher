import { Provider } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { AccountService } from '../services/account.service';
import { RmqErrorService } from '@app/errors';
import { AccountFacade } from '@app/utils';
import { ConfigService } from '@nestjs/config';
import { createGoogleAuthConfig } from '../configs/google.config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

export const accountRepositoryProvider: Provider = {
  provide: ACCOUNT_REPOSITORY,
  useClass: AccountRepository,
};

export const ACCOUNT_SERVICE = 'ACCOUNT_SERVICE';

export const accountServiceProvider: Provider = {
  provide: ACCOUNT_SERVICE,
  useFactory: (
    repository: AccountRepository,
    rmqErrorService: RmqErrorService,
    accountFacade: AccountFacade,
    amqpConnection: AmqpConnection,
  ) => {
    return new AccountService(repository, rmqErrorService, accountFacade, amqpConnection);
  },
  inject: [ACCOUNT_REPOSITORY, RmqErrorService, AccountFacade, AmqpConnection],
};

export const GOOGLE_AUTH_CREDENTIALS = 'GOOGLE_AUTH_CREDENTIALS';

export const googleAuthProvider: Provider = {
  provide: GOOGLE_AUTH_CREDENTIALS,
  useFactory: (configService: ConfigService) => {
    const config = createGoogleAuthConfig(configService);

    return config;
  },
  inject: [ConfigService],
}
