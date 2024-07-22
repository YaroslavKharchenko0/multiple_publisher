import { RmqResponse } from '../common'
import { DeleteAccountRequest, DeleteAccountResponse } from '@app/validation'

export namespace DeleteAccountCommand {
  export const exchange = 'account';

  export const routingKey = 'delete-account';

  export const queue = 'delete-account';

  export type Request = DeleteAccountRequest;

  export type ResponsePayload = DeleteAccountResponse;

  export type Response = RmqResponse<DeleteAccountResponse>
}

