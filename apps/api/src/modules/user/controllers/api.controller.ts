import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Controller, Get, Param } from "@nestjs/common";
import { FindUserByIdQuery } from '@app/contracts'
import { TraceId } from "@app/logger";
import { IsStringNumberPipe } from "@app/utils";

@Controller('users')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/:id')
  command(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string) {
    const payload: FindUserByIdQuery.Request = {
      id: Number(id)
    }

    return this.amqpConnection.request<FindUserByIdQuery.Response>({
      exchange: FindUserByIdQuery.exchange,
      routingKey: FindUserByIdQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }
}
