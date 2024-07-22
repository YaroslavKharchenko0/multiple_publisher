import { RmqResponse } from '../common';
import { FindPostByIdRequest, FindPostByIdResponse } from '@app/validation';

export namespace FindPostByIdQuery {
  export const exchange = 'post';

  export const routingKey = 'find-post-by-id';

  export const queue = 'find-post-by-id';

  export type Request = FindPostByIdRequest;

  export type ResponsePayload = FindPostByIdResponse;

  export type Response = RmqResponse<FindPostByIdResponse>;
}
