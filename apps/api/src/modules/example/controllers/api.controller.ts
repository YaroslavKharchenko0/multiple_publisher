import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Controller, Get } from "@nestjs/common";
import { CommandCommand, CommandErrorCommand, EventEvent, QueryQuery } from '@app/contracts'
import { TraceId } from "@app/logger";

@Controller('example')

export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/command')
  command(@TraceId() traceId: string | undefined) {
    const payload: CommandCommand.Request = {
      message: 'Hello World'
    }

    return this.amqpConnection.request<CommandCommand.Response>({
      exchange: CommandCommand.exchange,
      routingKey: CommandCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Get('/event')
  event(@TraceId() traceId: string | undefined) {
    const payload: EventEvent.Request = {
      message: 'Hello World'
    }

    return this.amqpConnection.publish<EventEvent.Request>(EventEvent.exchange, EventEvent.routingKey, payload, {
      headers: {
        traceId
      }
    });
  }

  @Get('/query')
  query(@TraceId() traceId: string | undefined) {
    const payload: QueryQuery.Request = {
      message: 'Hello World'
    }

    return this.amqpConnection.request<QueryQuery.Response>({
      exchange: QueryQuery.exchange,
      routingKey: QueryQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Get('/error')
  error(@TraceId() traceId: string | undefined) {
    const payload: CommandErrorCommand.Request = {
      message: 'Hello World'
    }

    return this.amqpConnection.request<CommandErrorCommand.Response>({
      exchange: CommandErrorCommand.exchange,
      routingKey: CommandErrorCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }
}
