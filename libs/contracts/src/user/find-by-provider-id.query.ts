import { RmqResponse } from '../common'
import { FindByProviderIdRequest, FindByProviderIdResponse } from '@app/validation'

export namespace FindByProviderIdCommand {
  export const exchange = 'user';

  export const routingKey = 'find-by-provider-id';

  export const queue = 'find-by-provider-id';

  export type Request = FindByProviderIdRequest;

  export type ResponsePayload = FindByProviderIdResponse;

  export type Response = RmqResponse<FindByProviderIdResponse>
}

