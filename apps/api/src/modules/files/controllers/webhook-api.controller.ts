import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Post } from '@nestjs/common';
import { TraceId } from '@app/logger';
import { OnWebhookBodyDto } from '@app/dtos';
import { OnWebhookEvent } from '@app/contracts';

@Controller('/files')
export class WebhookController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('/webhook')
  async webhook(
    @TraceId() traceId: string | undefined,
    @Body() body: OnWebhookBodyDto,
  ) {
    const payload: OnWebhookEvent.Request = body;

    await this.amqpConnection.publish<OnWebhookEvent.Request>(
      OnWebhookEvent.exchange,
      OnWebhookEvent.routingKey,
      payload,
      { headers: { traceId } },
    );
  }
}
