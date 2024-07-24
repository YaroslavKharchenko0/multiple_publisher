import { RmqResponse } from '../common';
import {
  FindPublicationByIdRequest,
  FindPublicationByIdResponse,
} from '@app/validation';

export namespace FindPublicationByIdQuery {
  export const exchange = 'publication';

  export const routingKey = 'find-publication-by-id';

  export const queue = 'find-publication-by-id';

  export type Request = FindPublicationByIdRequest;

  export type ResponsePayload = FindPublicationByIdResponse;

  export type Response = RmqResponse<FindPublicationByIdResponse>;
}
