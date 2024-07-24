import { RmqResponse } from '../common';
import {
  UpdatePublicationRequest,
  UpdatePublicationResponse,
} from '@app/validation';

export namespace UpdatePublicationCommand {
  export const exchange = 'publication';

  export const routingKey = 'update-publication';

  export const queue = 'update-publication';

  export type Request = UpdatePublicationRequest;

  export type ResponsePayload = UpdatePublicationResponse;

  export type Response = RmqResponse<UpdatePublicationResponse>;
}
