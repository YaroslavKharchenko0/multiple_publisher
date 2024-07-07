export const USER_SERVICE = 'USER_SERVICE';
export const USER_REPOSITORY = 'USER_REPOSITORY';

import { Provider } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { RmqErrorService } from "@app/errors";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { COGNITO_SERVICE, CognitoService } from "@app/aws";

export const userServiceProvider: Provider = {
  provide: USER_SERVICE,
  useFactory: (repository: UserRepository, rmqErrorService: RmqErrorService, amqpConnection: AmqpConnection, cognitoService: CognitoService) => {
    return new UserService(repository, rmqErrorService, amqpConnection, cognitoService);
  },
  inject: [USER_REPOSITORY, RmqErrorService, AmqpConnection, COGNITO_SERVICE]
};

export const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepository
};
