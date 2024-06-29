import { QueryQuery, createSuccessResponse } from "@app/contracts";
import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";

@Controller()
export class QueryController {
  constructor() { }

  @RabbitRPC({
    exchange: QueryQuery.exchange,
    routingKey: QueryQuery.routingKey,
    queue: QueryQuery.queue,
  })
  command(message: QueryQuery.Request): QueryQuery.Response {
    const payload = createSuccessResponse({
      message: `Command Received :${JSON.stringify(message)}`
    })

    return payload;
  }
}

