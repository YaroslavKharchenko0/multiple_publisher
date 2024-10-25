import {
  FindWorkspaceAccountsQuery,
  createSuccessResponse,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { WorkspaceAccountService } from '../services/workspace-account.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(WorkspaceAccountService)
    private readonly service: WorkspaceAccountService,
  ) { }

  @RabbitRPC({
    exchange: FindWorkspaceAccountsQuery.exchange,
    routingKey: FindWorkspaceAccountsQuery.routingKey,
    queue: FindWorkspaceAccountsQuery.queue,
  })
  async findWorkspaceAccounts(
    @RabbitPayload() message: FindWorkspaceAccountsQuery.Request,
  ): Promise<FindWorkspaceAccountsQuery.Response> {
    const findWorkspaceAccounts = this.service.findWorkspaceAccounts({
      workspaceId: message.workspaceId,
      pagination: message.pagination,
    });

    const createMetadata =
      this.service.createWorkspaceAccountsPaginationMetadata({
        workspaceId: message.workspaceId,
      });

    const [workspaceAccounts, metadata] = await Promise.all([
      findWorkspaceAccounts,
      createMetadata,
    ]);

    const payload: FindWorkspaceAccountsQuery.ResponsePayload = {
      workspaceAccounts,
      metadata,
    };

    return createSuccessResponse(payload);
  }
}
