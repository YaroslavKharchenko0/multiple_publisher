import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";
import { CommandCommand, CommandErrorCommand, createErrorResponse, createSuccessResponse } from "@app/contracts";

@Controller()
export class CommandController {
  constructor() { }

  @RabbitRPC({
    exchange: CommandCommand.exchange,
    routingKey: CommandCommand.routingKey,
    queue: CommandCommand.queue,
  })
  command(message: CommandCommand.Request): CommandCommand.Response {
    const payload = createSuccessResponse({
      message: `Command Received :${JSON.stringify(message)}`
    });

    return payload;
  }

  @RabbitRPC({
    exchange: CommandErrorCommand.exchange,
    routingKey: CommandErrorCommand.routingKey,
    queue: CommandErrorCommand.queue,
  })
  error(message: CommandErrorCommand.Request): CommandErrorCommand.Response {
    throw new Error('Error');
  }
}

