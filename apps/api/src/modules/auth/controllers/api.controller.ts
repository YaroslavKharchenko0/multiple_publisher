import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Body, Controller, Post } from "@nestjs/common";
import { SignInCommand, SignUpCommand } from '@app/contracts'
import { TraceId } from "@app/logger";
import { SignInBodyDto, SignUpBodyDto } from "@app/validation";

@Controller('auth')

export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('/sign-up')
  signUp(@TraceId() traceId: string | undefined, @Body() body: SignUpBodyDto) {
    const payload: SignUpCommand.Request = body;

    return this.amqpConnection.request<SignUpCommand.Response>({
      exchange: SignUpCommand.exchange,
      routingKey: SignUpCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Post('/sign-in')
  signIn(@TraceId() traceId: string | undefined, @Body() body: SignInBodyDto) {
    const payload: SignInCommand.Request = body;

    return this.amqpConnection.request<SignInCommand.Response>({
      exchange: SignInCommand.exchange,
      routingKey: SignInCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }
}
