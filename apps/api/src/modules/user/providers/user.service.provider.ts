import { Provider } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { RmqErrorService } from "@app/errors";

export const USER_SERVICE = 'USER_SERVICE'
export const USER_REPOSITORY = 'USER_REPOSITORY'

export const userServiceProvider: Provider = {
  provide: USER_SERVICE,
  useFactory: (repository: UserRepository, rmqErrorService: RmqErrorService) => {
    return new UserService(repository, rmqErrorService)
  },
  inject: [USER_REPOSITORY, RmqErrorService]
}

export const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepository
}

