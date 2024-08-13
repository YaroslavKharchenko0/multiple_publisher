import { RmqResponse } from '../common';
import {
  UpdatePublicationByIdRequest,
  UpdatePublicationByIdResponse,
} from '@app/validation';

export namespace UpdatePublicationByIdCommand {
  export const exchange = 'publication';

  export const routingKey = 'update-publication-by-id';

  export const queue = 'update-publication-by-id';

  export type Request = UpdatePublicationByIdRequest;

  export type ResponsePayload = UpdatePublicationByIdResponse;

  export type Response = RmqResponse<UpdatePublicationByIdResponse>;
}
