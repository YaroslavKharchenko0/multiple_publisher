import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreateWorkspacePostCommand,
  createSuccessResponse,
} from '@app/contracts';
import { WorkspacePostService } from '../services/workspace-post.service';

@Controller()
export class CommandController {
  constructor(
    @Inject(WorkspacePostService)
    private readonly service: WorkspacePostService,
  ) { }

  @RabbitRPC({
    exchange: CreateWorkspacePostCommand.exchange,
    routingKey: CreateWorkspacePostCommand.routingKey,
    queue: CreateWorkspacePostCommand.queue,
  })
  async createWorkspacePost(
    @RabbitPayload() message: CreateWorkspacePostCommand.Request,
  ): Promise<CreateWorkspacePostCommand.Response> {
    const payload = await this.service.createWorkspacePost({
      workspaceId: message.workspaceId,
      postId: message.postId,
    });

    return createSuccessResponse(payload);
  }
}
