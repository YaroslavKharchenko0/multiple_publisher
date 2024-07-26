import { RmqResponse } from '../common';
import { Publication } from '@app/validation';

export namespace OnCreatePublicationEvent {
  export const exchange = 'publication';

  export const routingKey = 'on-create-publication';

  export const queue = 'on-create-publication';

  export type Request = Publication;

  export type ResponsePayload = null;

  export type Response = RmqResponse<null>;
}
