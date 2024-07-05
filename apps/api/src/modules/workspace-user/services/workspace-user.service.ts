import { Inject, Injectable } from "@nestjs/common";
import { CreateOne, DeleteOneParams, FindOneParams, FindWorkspaceUsersParams, Service, UpdateOneParams, UpdateWorkspaceUserParams } from "./workspace-user.service.interface";
import { WorkspaceUserModel } from "../models/workspace-user.model";
import { WORKSPACE_USER_REPOSITORY } from "../providers/workspace-user.providers";
import { InsertWorkspaceUser, WorkspaceUserRepository } from "../repositories/workspace-user.repository";
import { WorkspaceRole } from "@app/types";
import { RmqResponseService } from "@app/errors";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { FindWorkspaceRoleQuery } from "@app/contracts";

@Injectable()
export class WorkspaceUserService implements Service {
  constructor(@Inject(WORKSPACE_USER_REPOSITORY) private readonly repository: WorkspaceUserRepository, private readonly amqpConnection: AmqpConnection, private readonly rmqResponseService: RmqResponseService) { }

  private async findWorkspaceRole(role: WorkspaceRole, traceId?: string) {
    const requestPayload: FindWorkspaceRoleQuery.Request = {
      role,
    }

    const response = await this.amqpConnection.request<FindWorkspaceRoleQuery.Response>({
      exchange: FindWorkspaceRoleQuery.exchange,
      routingKey: FindWorkspaceRoleQuery.routingKey,
      payload: requestPayload,
      headers: { traceId }
    })

    const roleModel = this.rmqResponseService.handleResponse(response);

    return roleModel;
  }

  private async create(input: InsertWorkspaceUser) {
    const entities = await this.repository.createOne(input)

    const [entity] = entities

    return WorkspaceUserModel.fromEntity(entity)
  }

  async createOneByRole(input: CreateOne): Promise<WorkspaceUserModel> {
    const role = await this.findWorkspaceRole(input.role)

    const partial = {
      userId: input.userId,
      workspaceId: input.workspaceId,
      roleId: role.id
    }

    return this.create(partial)
  }
  private async update(params: UpdateOneParams, input: Partial<WorkspaceUserModel>) {
    const entities = await this.repository.updateOne(params, input)

    const [entity] = entities

    return WorkspaceUserModel.fromEntity(entity)
  }

  async updateOneByRole(params: UpdateOneParams, input: Partial<UpdateWorkspaceUserParams>): Promise<WorkspaceUserModel> {
    const role = await this.findWorkspaceRole(input.role)

    const partial = {
      roleId: role.id
    }

    return this.update(params, partial)
  }
  async findOne(params: FindOneParams): Promise<WorkspaceUserModel> {
    const entity = await this.repository.findOne(params)

    return WorkspaceUserModel.fromEntity(entity)
  }
  async deleteOne(params: DeleteOneParams): Promise<WorkspaceUserModel> {
    const entities = await this.repository.deleteOne(params)

    const [entity] = entities

    return WorkspaceUserModel.fromEntity(entity)
  }
  async findWorkspaceUsers(params: FindWorkspaceUsersParams): Promise<WorkspaceUserModel[]> {
    const entities = await this.repository.findWorkspaceUsers({
      workspaceId: params.workspaceId,
      pagination: {
        limit: params?.pagination?.limit,
        offset: params?.pagination?.offset
      }
    })

    return entities.map(WorkspaceUserModel.fromEntity)
  }
}
