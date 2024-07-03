import { CreateUserRoleCommand, CreateWorkspaceCommand, UserCreatedEvent } from "@app/contracts";
import { AmqpConnection, RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";
import { TraceId } from "@app/logger";
import { Role } from "@app/types";

@Controller()
export class EventController {
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) { }

  @RabbitSubscribe({
    exchange: UserCreatedEvent.exchange,
    routingKey: UserCreatedEvent.routingKey,
    queue: UserCreatedEvent.queue,
  })
  async onCreateUser(@RabbitPayload() message: UserCreatedEvent.Request, @TraceId() traceId: string): Promise<void> {
    const rolePayload: CreateUserRoleCommand.Request = {
      role: Role.USER,
      userId: message.id,
    }

    await this.amqpConnection.request({
      exchange: CreateUserRoleCommand.exchange,
      routingKey: CreateUserRoleCommand.routingKey,
      payload: rolePayload,
      headers: {
        traceId
      }
    })

    const workspacePayload: CreateWorkspaceCommand.Request = {
      userId: message.id,
      name: `${message.name}'s Workspace`
    }

    await this.amqpConnection.request({
      exchange: CreateWorkspaceCommand.exchange,
      routingKey: CreateWorkspaceCommand.routingKey,
      payload: workspacePayload,
      headers: {
        traceId
      }
    })
  }
}

