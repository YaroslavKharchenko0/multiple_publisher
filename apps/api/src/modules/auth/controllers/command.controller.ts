import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  KeepSessionCommand,
  SignInCommand,
  SignOutCommand,
  SignUpCommand,
  VerifyEmailCommand,
  createSuccessResponse,
} from '@app/contracts';
import { AuthService } from '../services/auth.service';
import { AUTH_SERVICE } from '../constants';
import { TraceId } from '@app/logger';

@Controller()
export class CommandController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthService,
  ) { }

  @RabbitRPC({
    exchange: SignUpCommand.exchange,
    routingKey: SignUpCommand.routingKey,
    queue: SignUpCommand.queue,
  })
  async signUp(
    @RabbitPayload() message: SignUpCommand.Request,
    @TraceId() traceId: string,
  ): Promise<SignUpCommand.Response> {
    await this.authService.signUp(
      {
        email: message.email,
        password: message.password,
        birthDate: message?.birthDate,
        name: message?.name,
      },
      { traceId },
    );

    return createSuccessResponse(null);
  }

  @RabbitRPC({
    exchange: SignInCommand.exchange,
    routingKey: SignInCommand.routingKey,
    queue: SignInCommand.queue,
  })
  async signIn(
    @RabbitPayload() message: SignInCommand.Request,
  ): Promise<SignInCommand.Response> {
    const payload = await this.authService.signIn({
      email: message.email,
      password: message.password,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: SignOutCommand.exchange,
    routingKey: SignOutCommand.routingKey,
    queue: SignOutCommand.queue,
  })
  async signOut(@RabbitPayload() message: SignOutCommand.Request) {
    const payload = await this.authService.signOut({
      accessToken: message.accessToken,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: KeepSessionCommand.exchange,
    routingKey: KeepSessionCommand.routingKey,
    queue: KeepSessionCommand.queue,
  })
  async keepSession(@RabbitPayload() message: KeepSessionCommand.Request) {
    const payload = await this.authService.keepSession({
      refreshToken: message.refreshToken,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: VerifyEmailCommand.exchange,
    routingKey: VerifyEmailCommand.routingKey,
    queue: VerifyEmailCommand.queue,
  })
  async verifyEmail(
    @RabbitPayload() message: VerifyEmailCommand.Request,
  ): Promise<VerifyEmailCommand.Response> {
    await this.authService.verifyEmail({
      email: message.email,
      code: message.code,
    });

    return createSuccessResponse(null);
  }
}
