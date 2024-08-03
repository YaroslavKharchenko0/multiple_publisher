import { RmqResponse } from '../common';
import {
  PublishPublicationRequest,
  PublishPublicationResponse,
} from '@app/validation';

export namespace PublishPublicationCommand {
  export const exchange = 'publisher';

  export const routingKey = 'publish-publication';

  export const queue = 'publish-publication';

  export type Request = PublishPublicationRequest;

  export type ResponsePayload = PublishPublicationResponse;

  export type Response = RmqResponse<PublishPublicationResponse>;
}
