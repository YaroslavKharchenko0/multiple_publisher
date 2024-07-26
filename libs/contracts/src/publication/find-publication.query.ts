import { RmqResponse } from '../common';
import {
  FindPublicationRequest,
  FindPublicationResponse,
} from '@app/validation';

export namespace FindPublicationQuery {
  export const exchange = 'publication';

  export const routingKey = 'find-publication';

  export const queue = 'find-publication';

  export type Request = FindPublicationRequest;

  export type ResponsePayload = FindPublicationResponse;

  export type Response = RmqResponse<FindPublicationResponse>;
}
