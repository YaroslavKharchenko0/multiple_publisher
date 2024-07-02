import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { CreateRoleCommand, DeleteRoleCommand, createSuccessResponse } from "@app/contracts";
import { RoleService } from "../services/role.service";
import { ROLE_SERVICE } from "../providers/role.providers";

@Controller()
export class CommandController {
  constructor(@Inject(ROLE_SERVICE) private readonly roleService: RoleService) { }

  @RabbitRPC({
    exchange: CreateRoleCommand.exchange,
    routingKey: CreateRoleCommand.routingKey,
    queue: CreateRoleCommand.queue,
  })
  async createRole(@RabbitPayload() message: CreateRoleCommand.Request): Promise<CreateRoleCommand.Response> {
    const role = await this.roleService.createRole(message.role)

    return createSuccessResponse(role)
  }

  @RabbitRPC({
    exchange: DeleteRoleCommand.exchange,
    routingKey: DeleteRoleCommand.routingKey,
    queue: DeleteRoleCommand.queue,
  })
  async deleteRole(@RabbitPayload() message: DeleteRoleCommand.Request): Promise<DeleteRoleCommand.Response> {
    await this.roleService.deleteRole(message.role)

    return createSuccessResponse(null)
  }
}

