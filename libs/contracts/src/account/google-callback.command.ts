import { RmqResponse } from '../common'
import { GoogleCallbackRequest, GoogleCallbackResponse } from '@app/validation'

export namespace GoogleCallbackCommand {
  export const exchange = 'account';

  export const routingKey = 'google-callback';

  export const queue = 'google-callback';

  export type Request = GoogleCallbackRequest;

  export type ResponsePayload = GoogleCallbackResponse;

  export type Response = RmqResponse<GoogleCallbackResponse>
}
