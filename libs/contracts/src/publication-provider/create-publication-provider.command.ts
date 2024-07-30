import { RmqResponse } from '../common';
import {
  CreatePublicationProviderRequest,
  CreatePublicationProviderResponse,
} from '@app/validation';

export namespace CreatePublicationProviderCommand {
  export const exchange = 'publication-provider';

  export const routingKey = 'create-publication-provider';

  export const queue = 'create-publication-provider';

  export type Request = CreatePublicationProviderRequest;

  export type ResponsePayload = CreatePublicationProviderResponse;

  export type Response = RmqResponse<CreatePublicationProviderResponse>;
}
