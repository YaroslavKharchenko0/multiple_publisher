import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { CreateWorkspaceCommand, DeleteWorkspaceCommand, createSuccessResponse } from "@app/contracts";
import { WORKSPACE_SERVICE } from "../providers/workspace.providers";
import { WorkspaceService } from "../services/workspace.service";

@Controller()
export class CommandController {
  constructor(@Inject(WORKSPACE_SERVICE) private readonly workspaceService: WorkspaceService) { }

  @RabbitRPC({
    exchange: CreateWorkspaceCommand.exchange,
    routingKey: CreateWorkspaceCommand.routingKey,
    queue: CreateWorkspaceCommand.queue,
  })
  async createWorkspaces(@RabbitPayload() message: CreateWorkspaceCommand.Request): Promise<CreateWorkspaceCommand.Response> {
    const payload = await this.workspaceService.createWorkspace({
      name: message.name,
      userId: message.userId,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeleteWorkspaceCommand.exchange,
    routingKey: DeleteWorkspaceCommand.routingKey,
    queue: DeleteWorkspaceCommand.queue,
  })
  async deleteWorkspaces(@RabbitPayload() message: DeleteWorkspaceCommand.Request): Promise<DeleteWorkspaceCommand.Response> {
    await this.workspaceService.deleteWorkspace(message.id);

    return createSuccessResponse(null);
  }
}

