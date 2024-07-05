import { FindWorkspaceUserQuery, FindWorkspaceUsersQuery, createSuccessResponse } from "@app/contracts";
import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { WORKSPACE_USER_SERVICE } from "../providers/workspace-user.providers";
import { WorkspaceUserService } from "../services/workspace-user.service";

@Controller()
export class QueryController {
  constructor(@Inject(WORKSPACE_USER_SERVICE) private readonly service: WorkspaceUserService) { }

  @RabbitRPC({
    exchange: FindWorkspaceUserQuery.exchange,
    routingKey: FindWorkspaceUserQuery.routingKey,
    queue: FindWorkspaceUserQuery.queue,
  })
  async findWorkspaceUser(@RabbitPayload() message: FindWorkspaceUserQuery.Request): Promise<FindWorkspaceUserQuery.Response> {
    const payload = await this.service.findOne({
      userId: message.userId,
      workspaceId: message.workspaceId,
    })

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindWorkspaceUsersQuery.exchange,
    routingKey: FindWorkspaceUsersQuery.routingKey,
    queue: FindWorkspaceUsersQuery.queue,
  })
  async findWorkspaceUsers(@RabbitPayload() message: FindWorkspaceUsersQuery.Request): Promise<FindWorkspaceUsersQuery.Response> {
    const payload = await this.service.findWorkspaceUsers({
      workspaceId: message.workspaceId,
      pagination: {
        limit: message?.pagination?.limit,
        offset: message?.pagination?.offset,
      }
    })

    return createSuccessResponse(payload);
  }
}

