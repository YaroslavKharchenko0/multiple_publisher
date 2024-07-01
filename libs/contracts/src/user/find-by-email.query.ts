import { RmqResponse } from '../common'
import { FindByEmailRequest, FindByEmailResponse } from '@app/validation'

export namespace FindByEmailCommand {
  export const exchange = 'user';

  export const routingKey = 'find-by-email';

  export const queue = 'find-by-email';

  export type Request = FindByEmailRequest;

  export type ResponsePayload = FindByEmailResponse;

  export type Response = RmqResponse<FindByEmailResponse>
}

