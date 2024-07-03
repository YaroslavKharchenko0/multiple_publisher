import { UserCreatedEvent } from "@app/contracts";
import { RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { WORKSPACE_SERVICE } from "../providers/workspace.providers";
import { WorkspaceService } from "../services/workspace.service";
import { TraceId } from "@app/logger";

@Controller()
export class EventController {
  constructor(@Inject(WORKSPACE_SERVICE) private readonly workspaceService: WorkspaceService) { }

  @RabbitSubscribe({
    exchange: UserCreatedEvent.exchange,
    routingKey: UserCreatedEvent.routingKey,
    queue: UserCreatedEvent.queue,
  })
  async onCreateUser(@RabbitPayload() message: UserCreatedEvent.Request, @TraceId() traceId: string | undefined) {
    await this.workspaceService.createWorkspaceByUser(message.id, { traceId });
  }
}

