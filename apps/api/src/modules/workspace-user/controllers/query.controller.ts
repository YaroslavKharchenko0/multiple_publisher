import {
  FindUserWorkspacesQuery,
  FindWorkspaceUserQuery,
  FindWorkspaceUsersQuery,
  createSuccessResponse,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { WORKSPACE_USER_SERVICE } from '../providers/workspace-user.providers';
import { WorkspaceUserService } from '../services/workspace-user.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(WORKSPACE_USER_SERVICE)
    private readonly service: WorkspaceUserService,
  ) { }

  @RabbitRPC({
    exchange: FindWorkspaceUserQuery.exchange,
    routingKey: FindWorkspaceUserQuery.routingKey,
    queue: FindWorkspaceUserQuery.queue,
  })
  async findWorkspaceUser(
    @RabbitPayload() message: FindWorkspaceUserQuery.Request,
  ): Promise<FindWorkspaceUserQuery.Response> {
    const payload = await this.service.findOne({
      userId: message.userId,
      workspaceId: message.workspaceId,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindWorkspaceUsersQuery.exchange,
    routingKey: FindWorkspaceUsersQuery.routingKey,
    queue: FindWorkspaceUsersQuery.queue,
  })
  async findWorkspaceUsers(
    @RabbitPayload() message: FindWorkspaceUsersQuery.Request,
  ): Promise<FindWorkspaceUsersQuery.Response> {
    const payload = await this.service.findWorkspaceUsers({
      workspaceId: message.workspaceId,
      pagination: {
        limit: message?.pagination?.limit,
        offset: message?.pagination?.offset,
      },
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindUserWorkspacesQuery.exchange,
    routingKey: FindUserWorkspacesQuery.routingKey,
    queue: FindUserWorkspacesQuery.queue,
  })
  async findUserWorkspaces(
    @RabbitPayload() message: FindUserWorkspacesQuery.Request,
  ): Promise<FindUserWorkspacesQuery.Response> {
    const findWorkspaces = this.service.findUserWorkspaces({
      userId: message.userId,
      pagination: {
        limit: message?.pagination?.limit,
        offset: message?.pagination?.offset,
      },
    });

    const findMetadata = this.service.findUserWorkspacePaginationMetadata({
      userId: message.userId,
      unique: true,
    });

    const [workspaces, metadata] = await Promise.all([
      findWorkspaces,
      findMetadata,
    ]);

    const payload: FindUserWorkspacesQuery.ResponsePayload = {
      workspaces,
      metadata,
    };

    return createSuccessResponse(payload);
  }
}
