import { WorkspaceRole } from "@app/types";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JWTUser, WORKSPACE_ROLES_DECORATOR_KEY } from "../decorators";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { FindWorkspaceRoleByIdQuery, FindWorkspaceUserQuery, SuccessResponse } from "@app/contracts";
import { randomUUID } from "crypto";


@Injectable()
export class WorkspaceRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly amqpConnection: AmqpConnection) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<WorkspaceRole[]>(WORKSPACE_ROLES_DECORATOR_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const jwtUser: JWTUser | undefined | null = request?.user;

    const workspaceId = Number(request?.params?.workspaceId);

    const traceId = `workspace-role-${randomUUID()}`
    if (!jwtUser || !workspaceId) {
      return false;
    }

    const userId = jwtUser.app_id;

    const payload: FindWorkspaceUserQuery.Request = {
      userId,
      workspaceId,
    }

    const userRole = await this.amqpConnection.request<FindWorkspaceUserQuery.Response>({
      exchange: FindWorkspaceUserQuery.exchange,
      routingKey: FindWorkspaceUserQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    })

    if (userRole.isError) {
      return false;
    }

    const userRoleSuccessPayload = userRole as SuccessResponse<FindWorkspaceUserQuery.ResponsePayload>

    const workspaceRolesPayload: FindWorkspaceRoleByIdQuery.Request = {
      id: userRoleSuccessPayload.payload.roleId,
    }

    const workspaceRoles = await this.amqpConnection.request<FindWorkspaceRoleByIdQuery.Response>({
      exchange: FindWorkspaceRoleByIdQuery.exchange,
      routingKey: FindWorkspaceRoleByIdQuery.routingKey,
      payload: workspaceRolesPayload,
      headers: {
        traceId
      }
    })

    if (workspaceRoles.isError) {
      return false;
    }

    const successResponse = workspaceRoles as SuccessResponse<FindWorkspaceRoleByIdQuery.ResponsePayload>

    const hasRole = requiredRoles.some((role) => successResponse.payload.role === role);

    return hasRole;
  }

}
