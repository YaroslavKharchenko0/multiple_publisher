import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { CreateAccountProviderCommand, createSuccessResponse, DeleteAccountProviderCommand } from "@app/contracts";
import { ACCOUNT_PROVIDER_SERVICE } from "../providers/account-provider.providers";
import { AccountProviderService } from "../services/account-provider.service";

@Controller()
export class CommandController {
  constructor(@Inject(ACCOUNT_PROVIDER_SERVICE) private readonly service: AccountProviderService) { }

  @RabbitRPC({
    exchange: CreateAccountProviderCommand.exchange,
    routingKey: CreateAccountProviderCommand.routingKey,
    queue: CreateAccountProviderCommand.queue,
  })
  async create(@RabbitPayload() message: CreateAccountProviderCommand.Request): Promise<CreateAccountProviderCommand.Response> {
    const payload = await this.service.createAccountProvider({
      key: message.key,
    })

    return createSuccessResponse(payload)
  }

  @RabbitRPC({
    exchange: DeleteAccountProviderCommand.exchange,
    routingKey: DeleteAccountProviderCommand.routingKey,
    queue: DeleteAccountProviderCommand.queue,
  })
  async delete(@RabbitPayload() message: DeleteAccountProviderCommand.Request): Promise<DeleteAccountProviderCommand.Response> {
    const payload = await this.service.deleteAccountProvider(message.key)

    return createSuccessResponse(payload)
  }
}

