import { FindUserRoleCommand, createSuccessResponse } from "@app/contracts";
import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { UserRoleService } from "../services/user-role.service";
import { USER_ROLE_SERVICE } from "../providers/user-role.providers";

@Controller()
export class QueryController {
  constructor(@Inject(USER_ROLE_SERVICE) private readonly userRoleService: UserRoleService) { }

  @RabbitRPC({
    exchange: FindUserRoleCommand.exchange,
    routingKey: FindUserRoleCommand.routingKey,
    queue: FindUserRoleCommand.queue,
  })
  async findUserRole(@RabbitPayload() message: FindUserRoleCommand.Request): Promise<FindUserRoleCommand.Response> {
    const payload = await this.userRoleService.findUserRole(message.userId)

    return createSuccessResponse(payload)
  }
}

