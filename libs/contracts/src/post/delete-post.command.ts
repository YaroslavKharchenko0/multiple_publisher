import { RmqResponse } from '../common';
import { DeletePostRequest, DeletePostResponse } from '@app/validation';

export namespace DeletePostCommand {
  export const exchange = 'post';

  export const routingKey = 'delete-post';

  export const queue = 'delete-post';

  export type Request = DeletePostRequest;

  export type ResponsePayload = DeletePostResponse;

  export type Response = RmqResponse<DeletePostResponse>;
}
