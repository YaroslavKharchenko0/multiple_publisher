import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { CreateUserRoleCommand, DeleteUserRoleCommand, UpdateUserRoleCommand, createSuccessResponse } from "@app/contracts";
import { UserRoleService } from "../services/user-role.service";
import { USER_ROLE_SERVICE } from "../providers/user-role.providers";

@Controller()
export class CommandController {
  constructor(@Inject(USER_ROLE_SERVICE) private readonly userRoleService: UserRoleService) { }

  @RabbitRPC({
    exchange: CreateUserRoleCommand.exchange,
    routingKey: CreateUserRoleCommand.routingKey,
    queue: CreateUserRoleCommand.queue,
  })
  async createUserRole(@RabbitPayload() message: CreateUserRoleCommand.Request): Promise<CreateUserRoleCommand.Response> {
    const payload = await this.userRoleService.createUserRoleByRoleName({
      role: message.role,
      userId: message.userId
    })

    return createSuccessResponse(payload)
  }

  @RabbitRPC({
    exchange: UpdateUserRoleCommand.exchange,
    routingKey: UpdateUserRoleCommand.routingKey,
    queue: UpdateUserRoleCommand.queue,
  })
  async updateUserRole(@RabbitPayload() message: UpdateUserRoleCommand.Request): Promise<UpdateUserRoleCommand.Response> {
    const payload = await this.userRoleService.updateUserRoleByRoleName({
      role: message.role,
      userId: message.userId
    })

    return createSuccessResponse(payload)
  }

  @RabbitRPC({
    exchange: DeleteUserRoleCommand.exchange,
    routingKey: DeleteUserRoleCommand.routingKey,
    queue: DeleteUserRoleCommand.queue,
  })
  async deleteUserRole(@RabbitPayload() message: DeleteUserRoleCommand.Request): Promise<DeleteUserRoleCommand.Response> {
    await this.userRoleService.deleteUserRole(message.userId)

    return createSuccessResponse(null)
  }
}

