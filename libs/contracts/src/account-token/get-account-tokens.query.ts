import { RmqResponse } from '../common'
import { GetAccountTokensRequest, GetAccountTokensResponse } from '@app/validation'

export namespace GetAccountTokensQuery {
  export const exchange = 'account-token';

  export const routingKey = 'get-account-tokens';

  export const queue = 'get-account-tokens';

  export type Request = GetAccountTokensRequest;

  export type ResponsePayload = GetAccountTokensResponse;

  export type Response = RmqResponse<GetAccountTokensResponse>
}

