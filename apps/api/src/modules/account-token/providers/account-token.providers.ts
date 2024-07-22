import { Provider } from '@nestjs/common';
import { AccountTokenRepository } from '../repositories/account-token.repository';
import { AccountTokenService } from '../services/account-token.service';
import { RmqErrorService } from '@app/errors';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

export const ACCOUNT_TOKEN_REPOSITORY = 'ACCOUNT_TOKEN_REPOSITORY';

export const accountTokenRepositoryProvider: Provider = {
  provide: ACCOUNT_TOKEN_REPOSITORY,
  useClass: AccountTokenRepository,
};

export const ACCOUNT_TOKEN_SERVICE = 'ACCOUNT_TOKEN_SERVICE';

export const accountTokenServiceProvider: Provider = {
  provide: ACCOUNT_TOKEN_SERVICE,
  useFactory: (
    repository: AccountTokenRepository,
    rmqErrorService: RmqErrorService,
    amqpConnection: AmqpConnection,
  ) => {
    return new AccountTokenService(repository, rmqErrorService, amqpConnection);
  },
  inject: [ACCOUNT_TOKEN_REPOSITORY, RmqErrorService, AmqpConnection],
};
