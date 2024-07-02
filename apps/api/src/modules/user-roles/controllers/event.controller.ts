import { UserCreatedEvent } from "@app/contracts";
import { RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { USER_ROLE_SERVICE } from "../providers/user-role.providers";
import { UserRoleService } from "../services/user-role.service";
import { Role } from "@app/types";

@Controller()
export class EventController {
  constructor(@Inject(USER_ROLE_SERVICE) private readonly userRoleService: UserRoleService) { }

  @RabbitSubscribe({
    exchange: UserCreatedEvent.exchange,
    routingKey: UserCreatedEvent.routingKey,
    queue: UserCreatedEvent.queue,
  })
  async onCreateUser(@RabbitPayload() message: UserCreatedEvent.Request) {
    await this.userRoleService.createUserRoleByRoleName({
      role: Role.USER,
      userId: message.id
    })
  }
}

