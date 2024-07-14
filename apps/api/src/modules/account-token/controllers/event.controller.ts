import {
  OnDeleteAccountTokensEvent,
  UpdateAccountCommand,
} from '@app/contracts';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { AccountStatus } from '@app/types';
import { TraceId } from '@app/logger';

@Controller()
export class EventController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: OnDeleteAccountTokensEvent.exchange,
    routingKey: OnDeleteAccountTokensEvent.routingKey,
    queue: OnDeleteAccountTokensEvent.queue,
  })
  async onDelete(
    @TraceId() traceId: string | undefined,
    @RabbitPayload() message: OnDeleteAccountTokensEvent.Request,
  ) {
    const payload: UpdateAccountCommand.Request = {
      id: message.accountId,
      payload: {
        status: AccountStatus.INACTIVE,
      },
    };

    await this.amqpConnection.request({
      exchange: UpdateAccountCommand.exchange,
      routingKey: UpdateAccountCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
