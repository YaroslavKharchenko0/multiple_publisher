import {
  OnCreateAccountTokenEvent,
  OnDeleteAccountTokensEvent,
  UpdateAccountCommand,
} from '@app/contracts';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { AccountStatus, AccountTokenType } from '@app/types';
import { TraceId } from '@app/logger';

@Controller()
export class EventController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

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

  @RabbitSubscribe({
    exchange: OnCreateAccountTokenEvent.exchange,
    routingKey: OnCreateAccountTokenEvent.routingKey,
    queue: OnCreateAccountTokenEvent.queue,
  })
  async onCreate(
    @TraceId() traceId: string | undefined,
    @RabbitPayload() message: OnCreateAccountTokenEvent.Request,
  ) {
    const isAccessToken = message.type === AccountTokenType.ACCESS;

    if (isAccessToken) {
      const updateAccountPayload: UpdateAccountCommand.Request = {
        id: message.accountId,
        payload: {
          status: AccountStatus.ACTIVE,
        },
      };

      await this.amqpConnection.request<UpdateAccountCommand.Response>({
        exchange: UpdateAccountCommand.exchange,
        routingKey: UpdateAccountCommand.routingKey,
        payload: updateAccountPayload,
        headers: {
          traceId,
        },
      });
    }

    const isRefreshToken = message.type === AccountTokenType.REFRESH;

    if (isRefreshToken) {
      // TODO: add job for refresh token
    }
  }
}
