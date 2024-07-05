import { Inject, Injectable } from "@nestjs/common";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { CreateWorkspaceParams, Options, Service } from "./workspace.service.interface";
import { WorkspaceModel } from "../models/workspace.model";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { FindUserByIdQuery, WorkspaceCreatedEvent } from "@app/contracts";
import { RmqErrorService, RmqResponseService } from "@app/errors";
import { WORKSPACE_REPOSITORY } from "../providers/workspace.providers";

@Injectable()
export class WorkspaceService implements Service {
  constructor(@Inject(WORKSPACE_REPOSITORY) private readonly repository: WorkspaceRepository, private readonly amqpConnection: AmqpConnection, private readonly rmqResponseService: RmqResponseService, private readonly rmqErrorService: RmqErrorService) { }
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

  async createWorkspaceByUser(userId: number, options?: Options): Promise<WorkspaceModel> {
    const user = await this.findUserById(userId, options?.traceId);

    if (!user) {
      throw this.rmqErrorService.notFound();
    }

    return this.createWorkspace({
      name: `${user.name}'s Workspace`,
      userId,
    }, options);
  }
  async createWorkspace(input: CreateWorkspaceParams, options?: Options): Promise<WorkspaceModel> {
    const entities = await this.repository.createOne({
      name: input.name,
      userId: input.userId,
    })

    const [entity] = entities;

    const model = WorkspaceModel.fromEntity(entity);

    const payload: WorkspaceCreatedEvent.Request = model

    await this.amqpConnection.publish(WorkspaceCreatedEvent.exchange, WorkspaceCreatedEvent.routingKey, payload, { headers: { traceId: options?.traceId } });

    return model;
  }
  deleteWorkspace(id: number): Promise<void> {
    return this.repository.deleteById(id);
  }
  async findWorkspace(id: number): Promise<WorkspaceModel> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return WorkspaceModel.fromEntity(entity);
  }
}
