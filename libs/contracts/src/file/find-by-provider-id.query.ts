import { RmqResponse } from '../common'
import { FindFileByProviderIdRequest, FindFileByProviderIdResponse } from '@app/validation'

export namespace FindFileByProviderIdQuery {
  export const exchange = 'file';

  export const routingKey = 'find-file-by-provider-id';

  export const queue = 'find-file-by-provider-id';

  export type Request = FindFileByProviderIdRequest;

  export type ResponsePayload = FindFileByProviderIdResponse;

  export type Response = RmqResponse<FindFileByProviderIdResponse>
}

