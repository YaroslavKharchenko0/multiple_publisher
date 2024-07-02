import { Provider } from "@nestjs/common";
import { UserRoleRepository } from "../repositories/user-roles.repository";
import { UserRoleService } from "../services/user-role.service";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { RmqResponseService } from "@app/errors";

export const USER_ROLE_SERVICE = 'USER_ROLE_SERVICE';
export const USER_ROLE_REPOSITORY = 'USER_ROLE_REPOSITORY';

export const userRoleServiceProvider: Provider = {
  provide: USER_ROLE_SERVICE,
  useFactory: (repository: UserRoleRepository, amqpConnection: AmqpConnection, rmqResponseService: RmqResponseService) => {
    return new UserRoleService(repository, amqpConnection, rmqResponseService);
  },
  inject: [USER_ROLE_REPOSITORY, AmqpConnection, RmqResponseService],
};

export const userRoleRepositoryProvider: Provider = {
  provide: USER_ROLE_REPOSITORY,
  useClass: UserRoleRepository,
};
