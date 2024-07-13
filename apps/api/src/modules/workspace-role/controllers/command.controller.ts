import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreateWorkspaceRoleCommand,
  DeleteWorkspaceRoleCommand,
  createSuccessResponse,
} from '@app/contracts';
import { WORKSPACE_ROLE_SERVICE } from '../providers/workspace-role.providers';
import { WorkspaceRoleService } from '../services/workspace-role.service';

@Controller()
export class CommandController {
  constructor(
    @Inject(WORKSPACE_ROLE_SERVICE)
    private readonly service: WorkspaceRoleService,
  ) {}

  @RabbitRPC({
    exchange: CreateWorkspaceRoleCommand.exchange,
    routingKey: CreateWorkspaceRoleCommand.routingKey,
    queue: CreateWorkspaceRoleCommand.queue,
  })
  async create(
    @RabbitPayload() message: CreateWorkspaceRoleCommand.Request,
  ): Promise<CreateWorkspaceRoleCommand.Response> {
    const payload = await this.service.createWorkspaceRole({
      role: message.role,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeleteWorkspaceRoleCommand.exchange,
    routingKey: DeleteWorkspaceRoleCommand.routingKey,
    queue: DeleteWorkspaceRoleCommand.queue,
  })
  async delete(
    @RabbitPayload() message: DeleteWorkspaceRoleCommand.Request,
  ): Promise<DeleteWorkspaceRoleCommand.Response> {
    await this.service.deleteWorkspaceRole(message.role);

    return createSuccessResponse(null);
  }
}
