import { RmqResponse } from '../common'
import { VerifyEmailRequest, VerifyEmailResponse } from '@app/validation'

export namespace VerifyEmailCommand {
  export const exchange = 'auth';

  export const routingKey = 'verify-email';

  export const queue = 'verify-email';

  export type Request = VerifyEmailRequest;

  export type ResponsePayload = VerifyEmailResponse;

  export type Response = RmqResponse<VerifyEmailResponse>
}

