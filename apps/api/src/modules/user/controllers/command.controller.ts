import { createSuccessResponse, UpdateUserCommand, DeleteUserCommand } from "@app/contracts";
import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { USER_SERVICE } from "../providers/user.service.provider";
import { UserService } from "../services/user.service";

@Controller()
export class CommandController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) { }

  @RabbitRPC({
    exchange: UpdateUserCommand.exchange,
    routingKey: UpdateUserCommand.routingKey,
    queue: UpdateUserCommand.queue,
  })
  async updateUser(@RabbitPayload() message: UpdateUserCommand.Request): Promise<UpdateUserCommand.Response> {
    await this.userService.updateUserById(message.userId, { birthDate: message.birthDate, name: message.name });

    return createSuccessResponse(null);
  }

  @RabbitRPC({
    exchange: DeleteUserCommand.exchange,
    routingKey: DeleteUserCommand.routingKey,
    queue: DeleteUserCommand.queue,
  })
  async deleteUser(@RabbitPayload() message: DeleteUserCommand.Request): Promise<DeleteUserCommand.Response> {
    await this.userService.deleteUserById(message.id);

    return createSuccessResponse(null);
  }
}

