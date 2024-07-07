import { RmqResponse } from '../common'
import { OnWebhookRequest, OnWebhookResponse } from '@app/validation'

export namespace OnWebhookEvent {
  export const exchange = 'file';

  export const routingKey = 'on-bunny-webhook';

  export const queue = 'on-bunny-webhook';

  export type Request = OnWebhookRequest;

  export type ResponsePayload = OnWebhookResponse;

  export type Response = RmqResponse<OnWebhookResponse>
}

