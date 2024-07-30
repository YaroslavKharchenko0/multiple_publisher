import { RmqResponse } from '../common';
import {
  DeletePublicationProviderRequest,
  DeletePublicationProviderResponse,
} from '@app/validation';

export namespace DeletePublicationProviderCommand {
  export const exchange = 'publication-provider';

  export const routingKey = 'delete-publication-provider';

  export const queue = 'delete-publication-provider';

  export type Request = DeletePublicationProviderRequest;

  export type ResponsePayload = DeletePublicationProviderResponse;

  export type Response = RmqResponse<DeletePublicationProviderResponse>;
}
