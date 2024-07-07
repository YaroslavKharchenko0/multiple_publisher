import { Provider } from "@nestjs/common"
import { RoleRepository } from "../repositories/roles.repository"
import { RoleService } from "../services/role.service"
import { RmqErrorService } from "@app/errors"

export const ROLE_SERVICE = 'ROLE_SERVICE'
export const ROLE_REPOSITORY = 'ROLE_REPOSITORY'

export const roleServiceProvider: Provider = {
  provide: ROLE_SERVICE,
  useFactory: (repository: RoleRepository, rmqErrorService: RmqErrorService) => {
    return new RoleService(repository, rmqErrorService)
  },
  inject: [ROLE_REPOSITORY, RmqErrorService]
}

export const roleRepositoryProvider: Provider = {
  provide: ROLE_REPOSITORY,
  useClass: RoleRepository
}
