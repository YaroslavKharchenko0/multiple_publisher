import { RmqResponse } from '../common';
import { CreatePostRequest, CreatePostResponse } from '@app/validation';

export namespace CreatePostCommand {
  export const exchange = 'post';

  export const routingKey = 'create-post';

  export const queue = 'create-post';

  export type Request = CreatePostRequest;

  export type ResponsePayload = CreatePostResponse;

  export type Response = RmqResponse<CreatePostResponse>;
}
