import { RmqResponse } from '../common'
import { DeleteAccountProviderRequest, DeleteAccountProviderResponse } from '@app/validation'

export namespace DeleteAccountProviderCommand {
  export const exchange = 'account-provider';

  export const routingKey = 'delete-account-provider';

  export const queue = 'delete-account-provider';

  export type Request = DeleteAccountProviderRequest;

  export type ResponsePayload = DeleteAccountProviderResponse;

  export type Response = RmqResponse<DeleteAccountProviderResponse>
}

