import { Inject, Injectable } from '@nestjs/common';
import { Service } from './role.service.interface';
import { Role } from '@app/types';
import { RoleRepository } from '../repositories/roles.repository';
import { RoleModel } from '../models/role.model';
import { ROLE_REPOSITORY } from '../providers/role.providers';
import { Pagination } from '@app/validation';
import { RmqErrorService } from '@app/errors';

@Injectable()
export class RoleService implements Service {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly repository: RoleRepository,
    private readonly exceptionService: RmqErrorService,
  ) {}
  async findRoles(pagination: Pagination): Promise<RoleModel[]> {
    const roleEntities = await this.repository.findRoles(pagination);

    const roles = roleEntities.map((role) => RoleModel.fromEntity(role));

    return roles;
  }
  async createRole(role: Role): Promise<RoleModel> {
    const roleEntities = await this.repository.createOne({ role });

    const [roleEntity] = roleEntities;

    if (!roleEntity) {
      throw this.exceptionService.notFound();
    }

    const roleModel = RoleModel.fromEntity(roleEntity);

    return roleModel;
  }
  async findRoleByRole(role: Role): Promise<RoleModel> {
    const roleEntity = await this.repository.findByRole(role);

    if (!roleEntity) {
      throw this.exceptionService.notFound();
    }

    const roleModel = RoleModel.fromEntity(roleEntity);

    return roleModel;
  }
  deleteRole(role: Role): Promise<void> {
    return this.repository.deleteByRole(role);
  }
}
