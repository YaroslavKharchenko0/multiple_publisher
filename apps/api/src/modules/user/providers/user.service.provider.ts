import { Provider } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { RmqErrorService } from "@app/errors";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

export const USER_SERVICE = 'USER_SERVICE'
export const USER_REPOSITORY = 'USER_REPOSITORY'

export const userServiceProvider: Provider = {
  provide: USER_SERVICE,
  useFactory: (repository: UserRepository, rmqErrorService: RmqErrorService, amqpConnection: AmqpConnection) => {
    return new UserService(repository, rmqErrorService, amqpConnection)
  },
  inject: [USER_REPOSITORY, RmqErrorService, AmqpConnection]
}

export const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepository
}

