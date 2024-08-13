import { RmqResponse } from '../common';
import {
  FindPostPublicationsRequest,
  FindPostPublicationsResponse,
} from '@app/validation';

export namespace FindPostPublicationsQuery {
  export const exchange = 'publication';

  export const routingKey = 'find-post-publications';

  export const queue = 'find-post-publications';

  export type Request = FindPostPublicationsRequest;

  export type ResponsePayload = FindPostPublicationsResponse;

  export type Response = RmqResponse<FindPostPublicationsResponse>;
}
