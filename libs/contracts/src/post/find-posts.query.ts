import { RmqResponse } from '../common';
import { FindPostsRequest, FindPostsResponse } from '@app/validation';

export namespace FindPostsQuery {
  export const exchange = 'post';

  export const routingKey = 'find-posts';

  export const queue = 'find-posts';

  export type Request = FindPostsRequest;

  export type ResponsePayload = FindPostsResponse;

  export type Response = RmqResponse<FindPostsResponse>;
}
