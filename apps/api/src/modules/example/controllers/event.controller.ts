import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";

@Controller()
export class EventController {
  constructor() { }

  @RabbitSubscribe({
    exchange: 'example',
    routingKey: 'event',
    queue: 'event',
  })
  event(message: string) {
    console.log('Command', message);

    return { message: `Command Received :${JSON.stringify(message)}` };
  }
}

