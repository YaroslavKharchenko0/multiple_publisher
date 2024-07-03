import { AmqpConnection, RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";
import { CreateUserCommand, SignUpSuccessEvent } from "@app/contracts";
import { TraceId } from "@app/logger";

@Controller()
export class EventController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @RabbitSubscribe({
    exchange: SignUpSuccessEvent.exchange,
    routingKey: SignUpSuccessEvent.routingKey,
    queue: SignUpSuccessEvent.queue,
  })
  async onSuccessSignUp(@RabbitPayload() message: SignUpSuccessEvent.Request, @TraceId() traceId: string) {
    const payload: CreateUserCommand.Request = {
      email: message?.email,
      name: message?.name,
      providerId: message?.providerId,
      birthDate: message?.birthDate,
    }

    await this.amqpConnection.request({
      exchange: CreateUserCommand.exchange,
      routingKey: CreateUserCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    })
  }
}

