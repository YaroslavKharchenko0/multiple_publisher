import {
  WorkspaceCreatedEvent,
  CreateWorkspaceUserCommand,
} from '@app/contracts';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { TraceId } from '@app/logger';
import { WorkspaceRole } from '@app/types';

@Controller()
export class EventController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: WorkspaceCreatedEvent.exchange,
    routingKey: WorkspaceCreatedEvent.routingKey,
    queue: WorkspaceCreatedEvent.queue,
  })
  async onCreateWorkspace(
    @TraceId() traceId: string,
    @RabbitPayload() message: WorkspaceCreatedEvent.Request,
  ) {
    const createRolePayload: CreateWorkspaceUserCommand.Request = {
      role: WorkspaceRole.ADMIN,
      userId: message.userId,
      workspaceId: message.id,
    };

    await this.amqpConnection.request<CreateWorkspaceUserCommand.Request>({
      exchange: CreateWorkspaceUserCommand.exchange,
      routingKey: CreateWorkspaceUserCommand.routingKey,
      payload: createRolePayload,
      headers: { traceId },
    });
  }
}
