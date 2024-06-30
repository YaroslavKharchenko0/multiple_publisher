import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Controller, Get } from "@nestjs/common";
import { CommandCommand, CommandErrorCommand, EventEvent, QueryQuery } from '@app/contracts'

@Controller('example')

export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/command')
  command() {
    const payload: CommandCommand.Request = {
      message: 'Hello World'
    }

    return this.amqpConnection.request<CommandCommand.Response>({
      exchange: CommandCommand.exchange,
      routingKey: CommandCommand.routingKey,
      payload,
    });
  }

  @Get('/event')
  event() {
    const payload: EventEvent.Request = {
      message: 'Hello World'
    }

    return this.amqpConnection.publish<EventEvent.Request>(EventEvent.exchange, EventEvent.routingKey, payload);
  }

  @Get('/query')
  query() {
    const payload: QueryQuery.Request = {
      message: 'Hello World'
    }

    return this.amqpConnection.request<QueryQuery.Response>({
      exchange: QueryQuery.exchange,
      routingKey: QueryQuery.routingKey,
      payload
    });
  }

  @Get('/error')
  error() {
    const payload: CommandErrorCommand.Request = {
      message: 'Hello World'
    }

    return this.amqpConnection.request<CommandErrorCommand.Response>({
      exchange: CommandErrorCommand.exchange,
      routingKey: CommandErrorCommand.routingKey,
      payload
    });
  }
}
