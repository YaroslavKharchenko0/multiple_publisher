import { QueryQuery, createSuccessResponse } from "@app/contracts";
import { internalServerError } from "@app/errors";
import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";

@Controller()
export class QueryController {
  constructor() { }

  @RabbitRPC({
    exchange: QueryQuery.exchange,
    routingKey: QueryQuery.routingKey,
    queue: QueryQuery.queue,
  })
  command(@RabbitPayload() message: QueryQuery.Request): QueryQuery.Response {
    try {
      const payload = createSuccessResponse({
        message: `Command Received :${JSON.stringify(message)}`
      })

      return payload;
    }
    catch (error) {
      return internalServerError
    }
  }
}

