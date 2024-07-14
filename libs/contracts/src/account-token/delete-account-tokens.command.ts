import { RmqResponse } from '../common'
import { DeleteAccountTokensRequest, DeleteAccountTokensResponse } from '@app/validation'

export namespace DeleteAccountTokensCommand {
  export const exchange = 'account-token';

  export const routingKey = 'delete-account-tokens';

  export const queue = 'delete-account-tokens';

  export type Request = DeleteAccountTokensRequest;

  export type ResponsePayload = DeleteAccountTokensResponse;

  export type Response = RmqResponse<DeleteAccountTokensResponse>
}

