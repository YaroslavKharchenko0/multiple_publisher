import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body } from '@nestjs/common';
import {
  KeepSessionCommand,
  SignInCommand,
  SignOutCommand,
  SignUpCommand,
  VerifyEmailCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  KeepSessionBodyDto,
  SignInBodyDto,
  SignOutBodyDto,
  SignUpBodyDto,
  VerifyEmailBodyDto,
} from '@app/dtos';
import {
  KeepSessionDocs,
  SignInDocs,
  SignOutDocs,
  SignUpDocs,
  VerifyEmailDocs,
} from '@app/docs';
import { ModuleRoute, Route } from '@app/utils';

export const moduleName = 'auth';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'signUp')
  @SignUpDocs()
  signUp(@TraceId() traceId: string | undefined, @Body() body: SignUpBodyDto) {
    const payload: SignUpCommand.Request = body;

    return this.amqpConnection.request<SignUpCommand.Response>({
      exchange: SignUpCommand.exchange,
      routingKey: SignUpCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'signIn')
  @SignInDocs()
  signIn(@TraceId() traceId: string | undefined, @Body() body: SignInBodyDto) {
    const payload: SignInCommand.Request = body;

    return this.amqpConnection.request<SignInCommand.Response>({
      exchange: SignInCommand.exchange,
      routingKey: SignInCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'signOut')
  @SignOutDocs()
  signOut(
    @TraceId() traceId: string | undefined,
    @Body() body: SignOutBodyDto,
  ) {
    const payload: SignOutCommand.Request = body;

    return this.amqpConnection.request<SignOutCommand.Response>({
      exchange: SignOutCommand.exchange,
      routingKey: SignOutCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'verifyEmail')
  @VerifyEmailDocs()
  verifyEmail(
    @TraceId() traceId: string | undefined,
    @Body() body: VerifyEmailBodyDto,
  ) {
    const payload: VerifyEmailCommand.Request = body;

    return this.amqpConnection.request<VerifyEmailCommand.Response>({
      exchange: VerifyEmailCommand.exchange,
      routingKey: VerifyEmailCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
  @Route(moduleName, 'keepSession')
  @KeepSessionDocs()
  keepSession(
    @TraceId() traceId: string | undefined,
    @Body() body: KeepSessionBodyDto,
  ) {
    const payload: KeepSessionCommand.Request = body;

    return this.amqpConnection.request<KeepSessionCommand.Response>({
      exchange: KeepSessionCommand.exchange,
      routingKey: KeepSessionCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
