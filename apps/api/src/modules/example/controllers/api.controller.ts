import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Controller, Get } from "@nestjs/common";

@Controller('example')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/command')
  command() {
    return this.amqpConnection.request({
      exchange: 'example',
      routingKey: 'command',
      payload: { message: 'Hello World' }
    });
  }

  @Get('/event')
  event() {
    return this.amqpConnection.publish('example', 'event', { message: 'Hello World' });
  }

  @Get('/query')
  query() {
    return this.amqpConnection.request({
      exchange: 'example',
      routingKey: 'query',
      payload: { message: 'Hello World' }
    });
  }
}
