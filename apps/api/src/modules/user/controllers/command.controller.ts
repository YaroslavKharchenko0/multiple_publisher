import {
  createSuccessResponse,
  UpdateUserCommand,
  DeleteUserCommand,
  CreateUserCommand,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { USER_SERVICE } from '../providers/user.service.provider';
import { UserService } from '../services/user.service';
import { TraceId } from '@app/logger';

@Controller()
export class CommandController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  @RabbitRPC({
    exchange: CreateUserCommand.exchange,
    routingKey: CreateUserCommand.routingKey,
    queue: CreateUserCommand.queue,
  })
  async createUser(
    @TraceId() traceId: string,
    @RabbitPayload() message: CreateUserCommand.Request,
  ): Promise<CreateUserCommand.Response> {
    const payload = await this.userService.createUser(
      {
        email: message.email,
        providerId: message.providerId,
        name: message?.name,
        birthDate: message?.birthDate ? new Date(message.birthDate) : undefined,
      },
      { traceId },
    );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: UpdateUserCommand.exchange,
    routingKey: UpdateUserCommand.routingKey,
    queue: UpdateUserCommand.queue,
  })
  async updateUser(
    @RabbitPayload() message: UpdateUserCommand.Request,
  ): Promise<UpdateUserCommand.Response> {
    await this.userService.updateUserById(message.userId, {
      birthDate: message.birthDate,
      name: message.name,
    });

    return createSuccessResponse(null);
  }

  @RabbitRPC({
    exchange: DeleteUserCommand.exchange,
    routingKey: DeleteUserCommand.routingKey,
    queue: DeleteUserCommand.queue,
  })
  async deleteUser(
    @RabbitPayload() message: DeleteUserCommand.Request,
  ): Promise<DeleteUserCommand.Response> {
    await this.userService.deleteUserById(message.id);

    return createSuccessResponse(null);
  }
}
