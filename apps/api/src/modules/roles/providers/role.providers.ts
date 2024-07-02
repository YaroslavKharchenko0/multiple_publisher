import { Provider } from "@nestjs/common"
import { RoleRepository } from "../repositories/roles.repository"
import { RoleService } from "../services/role.service"

export const ROLE_SERVICE = 'ROLE_SERVICE'
export const ROLE_REPOSITORY = 'ROLE_REPOSITORY'

export const roleServiceProvider: Provider = {
  provide: ROLE_SERVICE,
  useFactory: (repository: RoleRepository) => {
    return new RoleService(repository)
  },
  inject: [ROLE_REPOSITORY]
}

export const roleRepositoryProvider: Provider = {
  provide: ROLE_REPOSITORY,
  useClass: RoleRepository
}
