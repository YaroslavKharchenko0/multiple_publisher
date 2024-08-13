import { RmqResponse } from '../common';
import {
  DeletePublicationRequest,
  DeletePublicationResponse,
} from '@app/validation';

export namespace DeletePublicationCommand {
  export const exchange = 'publication';

  export const routingKey = 'delete-publication';

  export const queue = 'delete-publication';

  export type Request = DeletePublicationRequest;

  export type ResponsePayload = DeletePublicationResponse;

  export type Response = RmqResponse<DeletePublicationResponse>;
}
