import { RmqResponse } from '../common';
import {
  FindPublicationProviderByIdRequest,
  FindPublicationProviderByIdResponse,
} from '@app/validation';

export namespace FindPublicationProviderByIdQuery {
  export const exchange = 'publication-provider';

  export const routingKey = 'find-publication-provider-by-id';

  export const queue = 'find-publication-provider-by-id';

  export type Request = FindPublicationProviderByIdRequest;

  export type ResponsePayload = FindPublicationProviderByIdResponse;

  export type Response = RmqResponse<FindPublicationProviderByIdResponse>;
}
