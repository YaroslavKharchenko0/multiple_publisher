import { RmqResponse } from '../common'
import { UpdateAccountRequest, UpdateAccountResponse } from '@app/validation'

export namespace UpdateAccountCommand {
  export const exchange = 'account';

  export const routingKey = 'update-account';

  export const queue = 'update-account';

  export type Request = UpdateAccountRequest;

  export type ResponsePayload = UpdateAccountResponse;

  export type Response = RmqResponse<UpdateAccountResponse>
}

