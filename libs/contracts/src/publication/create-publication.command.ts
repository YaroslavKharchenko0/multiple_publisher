import { RmqResponse } from '../common';
import {
  CreatePublicationRequest,
  CreatePublicationResponse,
} from '@app/validation';

export namespace CreatePublicationCommand {
  export const exchange = 'publication';

  export const routingKey = 'create-publication';

  export const queue = 'create-publication';

  export type Request = CreatePublicationRequest;

  export type ResponsePayload = CreatePublicationResponse;

  export type Response = RmqResponse<CreatePublicationResponse>;
}
