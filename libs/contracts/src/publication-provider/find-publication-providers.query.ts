import { RmqResponse } from '../common';
import {
  FindPublicationProvidersRequest,
  FindPublicationProvidersResponse,
} from '@app/validation';

export namespace FindPublicationProvidersQuery {
  export const exchange = 'publication-provider';

  export const routingKey = 'find-publication-providers';

  export const queue = 'find-publication-providers';

  export type Request = FindPublicationProvidersRequest;

  export type ResponsePayload = FindPublicationProvidersResponse;

  export type Response = RmqResponse<FindPublicationProvidersResponse>;
}
