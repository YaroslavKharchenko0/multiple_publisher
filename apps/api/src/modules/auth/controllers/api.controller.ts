import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Post, Put } from '@nestjs/common';
import {
  SignInCommand,
  SignUpCommand,
  VerifyEmailCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { SignInBodyDto, SignUpBodyDto, VerifyEmailBodyDto } from '@app/dtos';
import { SignInDocs, SignUpDocs, VerifyEmailDocs } from '@app/docs';

@Controller('auth')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('/sign-up')
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

  @Post('/sign-in')
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

  @Put('/email/verify')
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
}
