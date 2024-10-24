import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Param } from '@nestjs/common';
import { FindByIdWorkspaceQuery, FindWorkspacePostsQuery } from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  IsStringNumberPipe,
  ModuleRoute,
  Roles,
  Route,
  WorkspaceRoles,
} from '@app/utils';
import { Role, WorkspaceRole } from '@app/types';

export const moduleName = 'workspacePost';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'findWorkspacePosts')
  @Roles(Role.USER)
  @WorkspaceRoles(
    WorkspaceRole.ADMIN,
    WorkspaceRole.EDITOR,
    WorkspaceRole.VIEWER,
  )
  findWorkspacePosts(
    @TraceId() traceId: string | undefined,
    @Param('workspaceId', IsStringNumberPipe) id: string,
  ) {
    const payload: FindWorkspacePostsQuery.Request = {
      workspaceId: Number(id),
    };

    return this.amqpConnection.request<FindWorkspacePostsQuery.Response>({
      exchange: FindWorkspacePostsQuery.exchange,
      routingKey: FindWorkspacePostsQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
