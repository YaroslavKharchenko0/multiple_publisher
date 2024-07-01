import { RmqResponse } from '../common'
import { SignUpRequest, SignUpResponse } from '@app/validation'

export namespace SignUpCommand {
  export const exchange = 'auth';

  export const routingKey = 'sign-up';

  export const queue = 'sign-up';

  export type Request = SignUpRequest;

  export type ResponsePayload = SignUpResponse;

  export type Response = RmqResponse<SignUpResponse>
}

