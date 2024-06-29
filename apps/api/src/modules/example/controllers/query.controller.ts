import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";

@Controller()
export class QueryController {
  constructor() { }

  @RabbitRPC({
    exchange: 'example',
    routingKey: 'query',
    queue: 'query',
  })
  command(message: string) {
    return { message: `Query Received :${JSON.stringify(message)}` };
  }
}

