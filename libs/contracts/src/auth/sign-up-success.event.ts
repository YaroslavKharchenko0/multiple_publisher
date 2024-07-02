import { RmqResponse } from '../common'
import { SignUpSuccessRequest } from '@app/validation'

export namespace SignUpSuccessEvent {
  export const exchange = 'auth';

  export const routingKey = 'sign-up-success';

  export const queue = 'sign-up-success';

  export type Request = SignUpSuccessRequest;

  export type ResponsePayload = void;

  export type Response = RmqResponse<ResponsePayload>
}

