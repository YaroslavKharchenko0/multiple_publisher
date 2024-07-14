import { RmqResponse } from '../common'
import { GoogleSingInUrlRequest, GoogleSingInUrlResponse } from '@app/validation'

export namespace GoogleSingInUrlEvent {
  export const exchange = 'account';

  export const routingKey = 'google-sign-in-url';

  export const queue = 'google-sign-in-url';

  export type Request = GoogleSingInUrlRequest;

  export type ResponsePayload = GoogleSingInUrlResponse;

  export type Response = RmqResponse<GoogleSingInUrlResponse>
}

