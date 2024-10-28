import { RmqResponse } from '../common';
import { SignOutRequest, SignOutResponse } from '@app/validation';

export namespace SignOutCommand {
  export const exchange = 'auth';

  export const routingKey = 'sign-out';

  export const queue = 'sign-out';

  export type Request = SignOutRequest;

  export type ResponsePayload = SignOutResponse;

  export type Response = RmqResponse<SignOutResponse>;
}
