import { RmqResponse } from '../common'
import { CreateAccountProviderRequest, CreateAccountProviderResponse } from '@app/validation'

export namespace CreateAccountProviderCommand {
  export const exchange = 'account-provider';

  export const routingKey = 'create-account-provider';

  export const queue = 'create-account-provider';

  export type Request = CreateAccountProviderRequest;

  export type ResponsePayload = CreateAccountProviderResponse;

  export type Response = RmqResponse<CreateAccountProviderResponse>
}

