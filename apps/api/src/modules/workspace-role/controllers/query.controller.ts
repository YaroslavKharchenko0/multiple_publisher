import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { FindWorkspaceRoleQuery, createSuccessResponse } from "@app/contracts";
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
}

