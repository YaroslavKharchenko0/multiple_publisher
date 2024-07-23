import { RmqResponse } from '../common';
import { UpdatePostRequest, UpdatePostResponse } from '@app/validation';

export namespace UpdatePostCommand {
  export const exchange = 'post';

  export const routingKey = 'update-post';

  export const queue = 'update-post';

  export type Request = UpdatePostRequest;

  export type ResponsePayload = UpdatePostResponse;

  export type Response = RmqResponse<UpdatePostResponse>;
}
