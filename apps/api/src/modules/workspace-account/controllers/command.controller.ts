import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreateWorkspaceAccountCommand,
  createSuccessResponse,
} from '@app/contracts';
import { WorkspaceAccountService } from '../services/workspace-account.service';

@Controller()
export class CommandController {
  constructor(
    @Inject(WorkspaceAccountService)
    private readonly service: WorkspaceAccountService,
  ) { }

  @RabbitRPC({
    exchange: CreateWorkspaceAccountCommand.exchange,
    routingKey: CreateWorkspaceAccountCommand.routingKey,
    queue: CreateWorkspaceAccountCommand.queue,
  })
  async createWorkspaceAccount(
    @RabbitPayload() message: CreateWorkspaceAccountCommand.Request,
  ): Promise<CreateWorkspaceAccountCommand.Response> {
    const payload = await this.service.createWorkspaceAccount({
      workspaceId: message.workspaceId,
      accountId: message.accountId,
    });

    return createSuccessResponse(payload);
  }
}
