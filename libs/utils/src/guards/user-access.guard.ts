import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FILE_ACCESS_KEY, JWTUser } from '../decorators';

@Injectable()
export class UserAccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isEnable = this.reflector.getAllAndOverride<boolean>(
      FILE_ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isEnable) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const jwtUser: JWTUser | undefined | null = request?.user;
    if (!jwtUser) {
      return false;
    }

    if (jwtUser.isAdmin()) {
      return true;
    }

    const requestUserId = Number(request?.params?.userId);

    if (jwtUser.isMe(requestUserId)) {
      return true;
    }

    return false;
  }
}
