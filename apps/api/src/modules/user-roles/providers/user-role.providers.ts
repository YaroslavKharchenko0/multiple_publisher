import { Provider } from '@nestjs/common';
import { UserRoleRepository } from '../repositories/user-roles.repository';
import { UserRoleService } from '../services/user-role.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RmqErrorService, RmqResponseService } from '@app/errors';
import { COGNITO_SERVICE, CognitoService } from '@app/aws';

export const USER_ROLE_SERVICE = 'USER_ROLE_SERVICE';
export const USER_ROLE_REPOSITORY = 'USER_ROLE_REPOSITORY';

export const userRoleServiceProvider: Provider = {
  provide: USER_ROLE_SERVICE,
  useFactory: (
    repository: UserRoleRepository,
    amqpConnection: AmqpConnection,
    rmqResponseService: RmqResponseService,
    cognitoService: CognitoService,
    rmqErrorService: RmqErrorService,
  ) => {
    return new UserRoleService(
      repository,
      amqpConnection,
      rmqResponseService,
      cognitoService,
      rmqErrorService,
    );
  },
  inject: [
    USER_ROLE_REPOSITORY,
    AmqpConnection,
    RmqResponseService,
    COGNITO_SERVICE,
    RmqErrorService,
  ],
};

export const userRoleRepositoryProvider: Provider = {
  provide: USER_ROLE_REPOSITORY,
  useClass: UserRoleRepository,
};
