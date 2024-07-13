import { RmqResponse } from '../common'
import { FindAccountProvidersRequest, FindAccountProvidersResponse } from '@app/validation'

export namespace FindAccountProvidersQuery {
  export const exchange = 'account-provider';

  export const routingKey = 'find-account-providers';

  export const queue = 'find-account-providers';

  export type Request = FindAccountProvidersRequest;

  export type ResponsePayload = FindAccountProvidersResponse;

  export type Response = RmqResponse<FindAccountProvidersResponse>
}

