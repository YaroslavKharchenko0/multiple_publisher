import { Injectable } from "@nestjs/common";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { CreateWorkspaceParams, Service } from "./workspace.service.interface";
import { WorkspaceModel } from "../models/workspace.model";
import { Pagination } from "@app/validation";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { FindUserByIdQuery } from "@app/contracts";
import { RmqResponseService } from "@app/errors";

@Injectable()
export class WorkspaceService implements Service {
  constructor(private readonly repository: WorkspaceRepository, private readonly amqpConnection: AmqpConnection, private readonly rmqResponseService: RmqResponseService) { }
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

  async createWorkspaceByUser(userId: number): Promise<WorkspaceModel> {
    const user = await this.findUserById(userId);

    return this.createWorkspace({
      name: `${user.name}'s Workspace`,
      userId,
    });
  }
  async createWorkspace(input: CreateWorkspaceParams): Promise<WorkspaceModel> {
    const entities = await this.repository.createOne({
      name: input.name,
      userId: input.userId,
    })

    const [entity] = entities;

    return WorkspaceModel.fromEntity(entity);
  }
  deleteWorkspace(id: number): Promise<void> {
    return this.repository.deleteById(id);
  }
  async findWorkspace(id: number): Promise<WorkspaceModel> {
    const entity = await this.repository.findById(id);

    return WorkspaceModel.fromEntity(entity);
  }
  async findUserWorkspaces(userId: number, pagination: Pagination): Promise<WorkspaceModel[]> {
    const entities = await this.repository.findUserWorkspaces(userId, pagination);

    return entities.map(entity => WorkspaceModel.fromEntity(entity));
  }
}
