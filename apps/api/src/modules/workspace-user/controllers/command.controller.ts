import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { createSuccessResponse, CreateWorkspaceUserCommand, DeleteWorkspaceUserCommand, UpdateWorkspaceUserCommand } from "@app/contracts";
import { WORKSPACE_USER_SERVICE } from "../providers/workspace-user.providers";
import { WorkspaceUserService } from "../services/workspace-user.service";

@Controller()
export class CommandController {
  constructor(@Inject(WORKSPACE_USER_SERVICE) private readonly service: WorkspaceUserService) { }

  @RabbitRPC({
    exchange: CreateWorkspaceUserCommand.exchange,
    routingKey: CreateWorkspaceUserCommand.routingKey,
    queue: CreateWorkspaceUserCommand.queue,
  })
  async create(@RabbitPayload() message: CreateWorkspaceUserCommand.Request): Promise<CreateWorkspaceUserCommand.Response> {
    const payload = await this.service.createOneByRole({
      role: message.role,
      userId: message.userId,
      workspaceId: message.workspaceId,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: UpdateWorkspaceUserCommand.exchange,
    routingKey: UpdateWorkspaceUserCommand.routingKey,
    queue: UpdateWorkspaceUserCommand.queue,
  })
  async update(@RabbitPayload() message: UpdateWorkspaceUserCommand.Request): Promise<UpdateWorkspaceUserCommand.Response> {
    const payload = await this.service.updateOneByRole({
      userId: message.userId,
      workspaceId: message.workspaceId,
    }, {
      role: message.role,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeleteWorkspaceUserCommand.exchange,
    routingKey: DeleteWorkspaceUserCommand.routingKey,
    queue: DeleteWorkspaceUserCommand.queue,
  })
  async delete(@RabbitPayload() message: DeleteWorkspaceUserCommand.Request): Promise<DeleteWorkspaceUserCommand.Response> {
    await this.service.deleteOne({
      userId: message.userId,
      workspaceId: message.workspaceId,
    });

    return createSuccessResponse(null);
  }
}

