import { Role } from "@app/types";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JWTUser, ROLES_DECORATOR_KEY } from "../decorators";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_DECORATOR_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const jwtUser: JWTUser | undefined | null = request?.user;

    if (!jwtUser) {
      return false;
    }

    const hasRole = requiredRoles.some((role) => role === jwtUser.role);

    return hasRole;
  }

}
