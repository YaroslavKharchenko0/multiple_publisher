import { CognitoJWTUser } from '@app/aws';
import { Role } from '@app/types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class JWTUser {
  id!: string;
  email!: string;
  email_verified!: boolean;
  app_id!: number;
  role!: Role;

  isAdmin() {
    return this.role === Role.ADMIN;
  }

  isUser() {
    return this.role === Role.USER;
  }

  isIncludes(roles: Role[]) {
    return roles.includes(this.role);
  }

  isMe(id: number | null) {
    return this.app_id === id;
  }

  setFields(user: Partial<JWTUser>) {
    this.id = user.id ?? this.id;
    this.email = user.email ?? this.email;
    this.email_verified = user.email_verified ?? this.email_verified;
    this.role = user.role ?? this.role;
    this.app_id = user.app_id ?? this.app_id;
  }

  static fromCognito(user: CognitoJWTUser) {
    const jwtUser = new JWTUser();
    jwtUser.setFields({
      id: user.sub,
      email: user.email,
      email_verified: user.email_verified,
      role: user['custom:role'],
      app_id: Number(user['custom:app_id']),
    });
    return jwtUser;
  }
}

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JWTUser;
  },
);
