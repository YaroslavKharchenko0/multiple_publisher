import { RmqResponse } from '../common'
import { FindAccountProviderRequest, FindAccountProviderResponse } from '@app/validation'

export namespace FindAccountProviderQuery {
  export const exchange = 'account-provider';

  export const routingKey = 'find-account-provider';

  export const queue = 'find-account-provider';

  export type Request = FindAccountProviderRequest;

  export type ResponsePayload = FindAccountProviderResponse;

  export type Response = RmqResponse<FindAccountProviderResponse>
}

