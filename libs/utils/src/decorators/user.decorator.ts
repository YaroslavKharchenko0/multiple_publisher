import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JWTUser = {
  id: string;
  email: string;
  email_verified: boolean;
}

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JWTUser;
  },
);
