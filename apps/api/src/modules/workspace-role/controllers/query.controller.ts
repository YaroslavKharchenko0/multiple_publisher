import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { FindWorkspaceRoleByIdQuery, FindWorkspaceRoleQuery, createSuccessResponse } from "@app/contracts";
import { WORKSPACE_ROLE_SERVICE } from "../providers/workspace-role.providers";
import { WorkspaceRoleService } from "../services/workspace-role.service";

@Controller()
export class QueryController {
  constructor(@Inject(WORKSPACE_ROLE_SERVICE) private readonly service: WorkspaceRoleService) { }

  @RabbitRPC({
    exchange: FindWorkspaceRoleQuery.exchange,
    routingKey: FindWorkspaceRoleQuery.routingKey,
    queue: FindWorkspaceRoleQuery.queue,
  })
  async findByRole(@RabbitPayload() message: FindWorkspaceRoleQuery.Request): Promise<FindWorkspaceRoleQuery.Response> {
    const payload = await this.service.findWorkspaceRole(message.role);

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindWorkspaceRoleByIdQuery.exchange,
    routingKey: FindWorkspaceRoleByIdQuery.routingKey,
    queue: FindWorkspaceRoleByIdQuery.queue,
  })
  async findById(@RabbitPayload() message: FindWorkspaceRoleByIdQuery.Request): Promise<FindWorkspaceRoleByIdQuery.Response> {
    const payload = await this.service.findWorkspaceRoleById(message.id);

    return createSuccessResponse(payload);
  }
}

