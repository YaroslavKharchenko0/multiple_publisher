import { FindByIdWorkspaceQuery, createSuccessResponse } from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { WORKSPACE_SERVICE } from '../providers/workspace.providers';
import { WorkspaceService } from '../services/workspace.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(WORKSPACE_SERVICE)
    private readonly workspaceService: WorkspaceService,
  ) {}

  @RabbitRPC({
    exchange: FindByIdWorkspaceQuery.exchange,
    routingKey: FindByIdWorkspaceQuery.routingKey,
    queue: FindByIdWorkspaceQuery.queue,
  })
  async findByIdWorkspace(
    @RabbitPayload() message: FindByIdWorkspaceQuery.Request,
  ): Promise<FindByIdWorkspaceQuery.Response> {
    const payload = await this.workspaceService.findWorkspace(message.id);

    return createSuccessResponse(payload);
  }
}
