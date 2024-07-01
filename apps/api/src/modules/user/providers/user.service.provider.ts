import { Provider } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";

export const USER_SERVICE = 'USER_SERVICE'
export const USER_REPOSITORY = 'USER_REPOSITORY'

export const userServiceProvider: Provider = {
  provide: USER_SERVICE,
  useFactory: (repository: UserRepository) => {
    return new UserService(repository)
  },
  inject: [USER_REPOSITORY]
}

export const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepository
}

