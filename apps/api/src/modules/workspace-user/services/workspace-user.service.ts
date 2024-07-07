import { Inject, Injectable } from "@nestjs/common";
import { CreateOne, DeleteOneParams, FindOneParams, FindWorkspaceUsersParams, Options, Service, UpdateOneParams, UpdateWorkspaceUserParams } from "./workspace-user.service.interface";
import { WorkspaceUserModel } from "../models/workspace-user.model";
import { WORKSPACE_USER_REPOSITORY } from "../providers/workspace-user.providers";
import { InsertWorkspaceUser, WorkspaceUserRepository } from "../repositories/workspace-user.repository";
import { WorkspaceRole } from "@app/types";
import { RmqErrorService, RmqResponseService } from "@app/errors";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { FindWorkspaceRoleQuery } from "@app/contracts";

@Injectable()
export class WorkspaceUserService implements Service {
  constructor(@Inject(WORKSPACE_USER_REPOSITORY) private readonly repository: WorkspaceUserRepository, private readonly amqpConnection: AmqpConnection, private readonly rmqResponseService: RmqResponseService, private readonly rmqErrorService: RmqErrorService) { }

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

    if (!entity) {
      this.rmqErrorService.notFound();
    }

    return WorkspaceUserModel.fromEntity(entity)
  }

  async createOneByRole(input: CreateOne, options?: Options): Promise<WorkspaceUserModel> {
    const role = await this.findWorkspaceRole(input.role, options?.traceId)

    if (!role) {
      throw this.rmqErrorService.notFound()
    }

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

    if (!entity) {
      this.rmqErrorService.notFound();
    }

    return WorkspaceUserModel.fromEntity(entity)
  }

  async updateOneByRole(params: UpdateOneParams, input: Partial<UpdateWorkspaceUserParams>, options?: Options): Promise<WorkspaceUserModel> {
    const role = await this.findWorkspaceRole(input.role, options?.traceId)

    if (!role) {
      throw this.rmqErrorService.notFound()
    }

    const partial = {
      roleId: role.id
    }

    return this.update(params, partial)
  }
  async findOne(params: FindOneParams): Promise<WorkspaceUserModel> {
    const entity = await this.repository.findOne(params)

    if (!entity) {
      throw this.rmqErrorService.notFound()
    }

    return WorkspaceUserModel.fromEntity(entity)
  }
  async deleteOne(params: DeleteOneParams): Promise<WorkspaceUserModel> {
    const entities = await this.repository.deleteOne(params)

    const [entity] = entities

    if (!entity) {
      this.rmqErrorService.notFound();
    }

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
