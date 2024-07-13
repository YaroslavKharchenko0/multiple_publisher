import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get } from '@nestjs/common';
import {
  CommandCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';

@Controller('accounts/:accountId/tokens')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/command')
  command(@TraceId() traceId: string | undefined) {
    const payload: CommandCommand.Request = {
      message: 'Hello World',
    };

    return this.amqpConnection.request<CommandCommand.Response>({
      exchange: CommandCommand.exchange,
      routingKey: CommandCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
