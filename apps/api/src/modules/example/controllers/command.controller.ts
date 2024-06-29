import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";

@Controller()
export class CommandController {
  constructor() { }

  @RabbitRPC({
    exchange: 'example',
    routingKey: 'command',
    queue: 'command',
  })
  command(message: string) {
    console.log('Command', message);
    return { message: `Command Received :${JSON.stringify(message)}` };
  }
}

