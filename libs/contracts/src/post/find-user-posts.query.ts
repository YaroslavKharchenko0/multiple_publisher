import { RmqResponse } from '../common';
import { FindUserPostsRequest, FindUserPostsResponse } from '@app/validation';

export namespace FindUserPostsQuery {
  export const exchange = 'post';

  export const routingKey = 'find-user-posts';

  export const queue = 'find-user-posts';

  export type Request = FindUserPostsRequest;

  export type ResponsePayload = FindUserPostsResponse;

  export type Response = RmqResponse<FindUserPostsResponse>;
}
