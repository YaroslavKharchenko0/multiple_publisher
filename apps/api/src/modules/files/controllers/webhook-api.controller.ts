import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Controller, Post } from "@nestjs/common";
import { TraceId } from "@app/logger";

@Controller('/files')
export class WebhookController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('/webhook')
  webhook(@TraceId() traceId: string | undefined) {

  }
}
