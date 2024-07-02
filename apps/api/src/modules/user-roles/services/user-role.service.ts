import { Inject, Injectable } from "@nestjs/common";
import { CreateUserRoleByRoleNameParams, CreateUserRoleParams, Options, Service } from "./user-role.service.interface";
import { UserRoleModel } from "../models/user-role.model";
import { UserRoleRepository } from "../repositories/user-roles.repository";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { FindRoleQuery, FindUserByIdQuery } from "@app/contracts";
import { RmqResponseService } from "@app/errors";
import { Role } from "@app/types";
import { USER_ROLE_REPOSITORY } from "../providers/user-role.providers";
import { Cognito, CognitoService } from "@app/aws";

@Injectable()
export class UserRoleService implements Service {
  private readonly userClaimsKeys = ['role'];

  constructor(@Inject(USER_ROLE_REPOSITORY) private readonly repository: UserRoleRepository, private readonly amqpConnection: AmqpConnection, private readonly rmqResponseService: RmqResponseService, @Cognito() private readonly cognitoService: CognitoService) { }

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

  private async findUserById(userId: number, traceId?: string) {
    const requestPayload: FindUserByIdQuery.Request = {
      id: userId,
    }

    const response = await this.amqpConnection.request<FindUserByIdQuery.Response>({
      exchange: FindUserByIdQuery.exchange,
      routingKey: FindUserByIdQuery.routingKey,
      payload: requestPayload,
      headers: { traceId }
    })

    const userModel = this.rmqResponseService.handleResponse(response);

    return userModel;
  }

  createUserClaims(role: Role) {
    const userClaims: Record<string, string> = {
      role,
    }

    return userClaims;
  }

  async createUserRoleByRoleName(params: CreateUserRoleByRoleNameParams, options?: Options): Promise<UserRoleModel> {
    const { userId, role } = params;

    const roleModel = await this.findRole(role, options?.traceId)

    const userModel = await this.findUserById(userId, options?.traceId)

    const userClaims = this.createUserClaims(role);

    await this.cognitoService.setCustomClaims({ claims: userClaims, email: userModel.email })

    return this.createUserRole({
      userId,
      roleId: roleModel.id
    })
  }

  private async createUserRole(params: CreateUserRoleParams): Promise<UserRoleModel> {
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
  async deleteUserRole(userId: number, options?: Options): Promise<void> {
    const userModel = await this.findUserById(userId, options?.traceId)

    await this.cognitoService.deleteCustomClaims({
      email: userModel.email,
      claims: this.userClaimsKeys,
    });

    return this.repository.deleteByUserId(userId);
  }
  async updateUserRoleByRoleName(params: CreateUserRoleByRoleNameParams, options?: Options): Promise<UserRoleModel> {
    const { userId, role } = params;

    const roleModel = await this.findRole(role, options?.traceId)

    const userModel = await this.findUserById(userId, options?.traceId)

    const userClaims = this.createUserClaims(role);

    await this.cognitoService.setCustomClaims({ claims: userClaims, email: userModel.email })

    return this.updateUserRole({
      userId,
      roleId: roleModel.id
    })
  }
  private async updateUserRole(params: CreateUserRoleParams): Promise<UserRoleModel> {
    const userRoleEntities = await this.repository.updateByUserId(params.userId, {
      userId: params.userId,
      roleId: params.roleId
    })

    const [userRoleEntity] = userRoleEntities;

    return UserRoleModel.fromEntity(userRoleEntity);
  }
}
