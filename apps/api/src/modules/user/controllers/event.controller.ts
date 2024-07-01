import { SignUpSuccessEvent } from "@app/contracts";
import { RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { USER_SERVICE } from "../providers/user.service.provider";

@Controller()
export class EventController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) { }

  @RabbitSubscribe({
    exchange: SignUpSuccessEvent.exchange,
    routingKey: SignUpSuccessEvent.routingKey,
    queue: SignUpSuccessEvent.queue,
  })
  async onSignUp(@RabbitPayload() message: SignUpSuccessEvent.Request): Promise<void> {
    await this.userService.createUser({
      email: message.email,
      providerId: message.providerId,
    });
  }
}

