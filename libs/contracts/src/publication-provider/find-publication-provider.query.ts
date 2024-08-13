import { RmqResponse } from '../common';
import {
  FindPublicationProviderRequest,
  FindPublicationProviderResponse,
} from '@app/validation';

export namespace FindPublicationProviderQuery {
  export const exchange = 'publication-provider';

  export const routingKey = 'find-publication-provider';

  export const queue = 'find-publication-provider';

  export type Request = FindPublicationProviderRequest;

  export type ResponsePayload = FindPublicationProviderResponse;

  export type Response = RmqResponse<FindPublicationProviderResponse>;
}
