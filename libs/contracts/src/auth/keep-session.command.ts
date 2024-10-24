import { RmqResponse } from '../common';
import { KeepSessionRequest, KeepSessionResponse } from '@app/validation';

export namespace KeepSessionCommand {
  export const exchange = 'auth';

  export const routingKey = 'keep-session';

  export const queue = 'keep-session';

  export type Request = KeepSessionRequest;

  export type ResponsePayload = KeepSessionResponse;

  export type Response = RmqResponse<KeepSessionResponse>;
}
