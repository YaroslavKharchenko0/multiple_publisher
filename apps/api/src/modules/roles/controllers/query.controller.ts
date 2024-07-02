import { FindRoleQuery, FindRolesQuery, createSuccessResponse } from "@app/contracts";
import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { ROLE_SERVICE } from "../providers/role.providers";
import { RoleService } from "../services/role.service";

@Controller()
export class QueryController {
  constructor(@Inject(ROLE_SERVICE) private readonly roleService: RoleService) { }

  @RabbitRPC({
    exchange: FindRoleQuery.exchange,
    routingKey: FindRoleQuery.routingKey,
    queue: FindRoleQuery.queue,
  })
  async findRole(@RabbitPayload() message: FindRoleQuery.Request): Promise<FindRoleQuery.Response> {
    const role = await this.roleService.findRoleByRole(message.role)

    return createSuccessResponse(role)
  }

  @RabbitRPC({
    exchange: FindRolesQuery.exchange,
    routingKey: FindRolesQuery.routingKey,
    queue: FindRolesQuery.queue,
  })
  async findRoles(@RabbitPayload() message: FindRolesQuery.Request): Promise<FindRolesQuery.Response> {
    const roles = await this.roleService.findRoles(message)

    return createSuccessResponse(roles)
  }
}

