import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { FindWorkspacePostsQuery, createSuccessResponse } from '@app/contracts';
import { WorkspacePostService } from '../services/workspace-post.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(WorkspacePostService)
    private readonly service: WorkspacePostService,
  ) { }

  @RabbitRPC({
    exchange: FindWorkspacePostsQuery.exchange,
    routingKey: FindWorkspacePostsQuery.routingKey,
    queue: FindWorkspacePostsQuery.queue,
  })
  async findWorkspacePosts(
    @RabbitPayload() message: FindWorkspacePostsQuery.Request,
  ): Promise<FindWorkspacePostsQuery.Response> {
    const findWorkspacePosts = this.service.findWorkspacePosts({
      workspaceId: message.workspaceId,
      pagination: message.pagination,
    });

    const createMetadata = this.service.createWorkspacePostsPaginationMetadata({
      workspaceId: message.workspaceId,
    });

    const [workspacePosts, metadata] = await Promise.all([
      findWorkspacePosts,
      createMetadata,
    ]);

    const payload: FindWorkspacePostsQuery.ResponsePayload = {
      workspacePosts,
      metadata,
    };

    return createSuccessResponse(payload);
  }
}
