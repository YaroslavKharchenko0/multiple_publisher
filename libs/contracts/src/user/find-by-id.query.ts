import { RmqResponse } from '../common'
import { FindByIdRequest, FindByIdResponse } from '@app/validation'

export namespace FindUserByIdQuery {
  export const exchange = 'user';

  export const routingKey = 'find-by-id';

  export const queue = 'find-by-id';

  export type Request = FindByIdRequest;

  export type ResponsePayload = FindByIdResponse;

  export type Response = RmqResponse<FindByIdResponse>
}

