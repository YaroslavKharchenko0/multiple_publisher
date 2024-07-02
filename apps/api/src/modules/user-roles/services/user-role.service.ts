import { Inject, Injectable } from "@nestjs/common";
import { CreateUserRoleByRoleNameParams, CreateUserRoleParams, Options, Service } from "./user-role.service.interface";
import { UserRoleModel } from "../models/user-role.model";
import { UserRoleRepository } from "../repositories/user-roles.repository";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { FindRoleQuery } from "@app/contracts";
import { RmqResponseService } from "@app/errors";
import { Role } from "@app/types";
import { USER_ROLE_REPOSITORY } from "../providers/user-role.providers";

@Injectable()
export class UserRoleService implements Service {
  constructor(@Inject(USER_ROLE_REPOSITORY) private readonly repository: UserRoleRepository, private readonly amqpConnection: AmqpConnection, private readonly rmqResponseService: RmqResponseService) { }

  private async findRole(role: Role, traceId?: string) {
    const requestPayload: FindRoleQuery.Request = {
      role,
    }

    const response = await this.amqpConnection.request<FindRoleQuery.Response>({
      exchange: FindRoleQuery.exchange,
      routingKey: FindRoleQuery.routingKey,
      payload: requestPayload,
      headers: { traceId }
    })

    const roleModel = this.rmqResponseService.handleResponse(response);

    return roleModel;
  }

  async createUserRoleByRoleName(params: CreateUserRoleByRoleNameParams, options?: Options): Promise<UserRoleModel> {
    const { userId, role } = params;

    const roleModel = await this.findRole(role, options?.traceId)

    return this.createUserRole({
      userId,
      roleId: roleModel.id
    })
  }

  async createUserRole(params: CreateUserRoleParams): Promise<UserRoleModel> {
    const userRoleEntities = await this.repository.createOne({
      userId: params.userId,
      roleId: params.roleId
    })

    const [userRoleEntity] = userRoleEntities;

    return UserRoleModel.fromEntity(userRoleEntity);
  }
  async findUserRole(userId: number): Promise<UserRoleModel> {
    const userRoleEntity = await this.repository.findByUserId(userId);

    return UserRoleModel.fromEntity(userRoleEntity);
  }
  deleteUserRole(userId: number): Promise<void> {
    return this.repository.deleteByUserId(userId);
  }
  async updateUserRoleByRoleName(params: CreateUserRoleByRoleNameParams, options?: Options): Promise<UserRoleModel> {
    const { userId, role } = params;

    const roleModel = await this.findRole(role, options?.traceId)

    return this.updateUserRole({
      userId,
      roleId: roleModel.id
    })
  }
  async updateUserRole(params: CreateUserRoleParams): Promise<UserRoleModel> {
    const userRoleEntities = await this.repository.updateByUserId(params.userId, {
      userId: params.userId,
      roleId: params.roleId
    })

    const [userRoleEntity] = userRoleEntities;

    return UserRoleModel.fromEntity(userRoleEntity);
  }
}
