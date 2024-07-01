import { FindUserByIdQuery, FindUserByEmailQuery, createSuccessResponse, FindUserByProviderIdQuery } from "@app/contracts";
import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { USER_SERVICE } from "../providers/user.service.provider";
import { UserService } from "../services/user.service";

@Controller()
export class QueryController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) { }

  @RabbitRPC({
    exchange: FindUserByIdQuery.exchange,
    routingKey: FindUserByIdQuery.routingKey,
    queue: FindUserByIdQuery.queue,
  })
  async findById(@RabbitPayload() message: FindUserByIdQuery.Request): Promise<FindUserByIdQuery.Response> {
    const user = await this.userService.findUserById(message.id);
    return createSuccessResponse(user);
  }

  @RabbitRPC({
    exchange: FindUserByEmailQuery.exchange,
    routingKey: FindUserByEmailQuery.routingKey,
    queue: FindUserByEmailQuery.queue,
  })
  async findByEmail(@RabbitPayload() message: FindUserByEmailQuery.Request): Promise<FindUserByEmailQuery.Response> {
    const user = await this.userService.findUserByEmail(message.email);
    return createSuccessResponse(user);
  }

  @RabbitRPC({
    exchange: FindUserByProviderIdQuery.exchange,
    routingKey: FindUserByProviderIdQuery.routingKey,
    queue: FindUserByProviderIdQuery.queue,
  })
  async findByProvider(@RabbitPayload() message: FindUserByProviderIdQuery.Request): Promise<FindUserByProviderIdQuery.Response> {
    const user = await this.userService.findUserByProviderId(message.providerId);
    return createSuccessResponse(user);
  }
}

