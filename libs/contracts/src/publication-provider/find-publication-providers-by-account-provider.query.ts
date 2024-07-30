import { RmqResponse } from '../common';
import {
  FindPublicationProvidersByAccountProviderRequest,
  FindPublicationProvidersByAccountProviderResponse,
} from '@app/validation';

export namespace FindPublicationProvidersByAccountProviderQuery {
  export const exchange = 'publication-provider';

  export const routingKey = 'find-publication-providers-by-account-provider';

  export const queue = 'find-publication-providers-by-account-provider';

  export type Request = FindPublicationProvidersByAccountProviderRequest;

  export type ResponsePayload =
    FindPublicationProvidersByAccountProviderResponse;

  export type Response =
    RmqResponse<FindPublicationProvidersByAccountProviderResponse>;
}
