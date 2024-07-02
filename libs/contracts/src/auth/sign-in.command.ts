import { RmqResponse } from '../common'
import { SignInRequest, SignInResponse } from '@app/validation'

export namespace SignInCommand {
  export const exchange = 'auth';

  export const routingKey = 'sign-in';

  export const queue = 'sign-in';

  export type Request = SignInRequest;

  export type ResponsePayload = SignInResponse;

  export type Response = RmqResponse<SignInResponse>
}

