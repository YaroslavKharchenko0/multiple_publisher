import { RmqResponse } from '../common'
import { FindAccountRequest, FindAccountResponse } from '@app/validation'

export namespace FindAccountCommand {
  export const exchange = 'account';

  export const routingKey = 'find-account';

  export const queue = 'find-account';

  export type Request = FindAccountRequest;

  export type ResponsePayload = FindAccountResponse;

  export type Response = RmqResponse<FindAccountResponse>
}

