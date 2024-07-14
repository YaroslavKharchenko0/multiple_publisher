import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreateAccountCommand,
  createSuccessResponse,
  DeleteAccountCommand,
  UpdateAccountCommand,
} from '@app/contracts';
import { ACCOUNT_SERVICE } from '../providers/account.providers';
import { AccountService } from '../services/account.service';

@Controller()
export class CommandController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly service: AccountService,
  ) {}

  @RabbitRPC({
    exchange: CreateAccountCommand.exchange,
    routingKey: CreateAccountCommand.routingKey,
    queue: CreateAccountCommand.queue,
  })
  async create(
    @RabbitPayload() message: CreateAccountCommand.Request,
  ): Promise<CreateAccountCommand.Response> {
    const payload = await this.service.createAccount({
      name: message.name,
      provider: message.provider,
      status: message.status,
      userId: message.userId,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeleteAccountCommand.exchange,
    routingKey: DeleteAccountCommand.routingKey,
    queue: DeleteAccountCommand.queue,
  })
  async delete(
    @RabbitPayload() message: DeleteAccountCommand.Request,
  ): Promise<DeleteAccountCommand.Response> {
    const payload = await this.service.deleteAccountById(message.id);

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: UpdateAccountCommand.exchange,
    routingKey: UpdateAccountCommand.routingKey,
    queue: UpdateAccountCommand.queue,
  })
  async update(
    @RabbitPayload() message: UpdateAccountCommand.Request,
  ): Promise<UpdateAccountCommand.Response> {
    const payload = await this.service.updateAccountById(
      message.id,
      message.payload,
    );

    return createSuccessResponse(payload);
  }
}
