import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import {
  CommandCommand,
  CommandErrorCommand,
  createSuccessResponse,
} from '@app/contracts';
import { RmqErrorService, internalServerError } from '@app/errors';

@Controller()
export class CommandController {
  constructor(private readonly rmqErrorService: RmqErrorService) {}

  @RabbitRPC({
    exchange: CommandCommand.exchange,
    routingKey: CommandCommand.routingKey,
    queue: CommandCommand.queue,
  })
  command(
    @RabbitPayload() message: CommandCommand.Request,
  ): CommandCommand.Response {
    try {
      const payload = createSuccessResponse({
        message: `Command Received :${JSON.stringify(message)}`,
      });

      return payload;
    } catch (error) {
      return internalServerError;
    }
  }

  @RabbitRPC({
    exchange: CommandErrorCommand.exchange,
    routingKey: CommandErrorCommand.routingKey,
    queue: CommandErrorCommand.queue,
  })
  error() //@RabbitPayload() _message: CommandErrorCommand.Request,
  : CommandErrorCommand.Response {
    throw this.rmqErrorService.notFound();
  }
}
