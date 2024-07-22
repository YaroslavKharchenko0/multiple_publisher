import { RmqResponse } from '../common';
import {
  OnCreateAccountTokenRequest,
  OnCreateAccountTokenResponse,
} from '@app/validation';

export namespace OnCreateAccountTokenEvent {
  export const exchange = 'account-token';

  export const routingKey = 'on-create-account-token';

  export const queue = 'on-create-account-token';

  export type Request = OnCreateAccountTokenRequest;

  export type ResponsePayload = OnCreateAccountTokenResponse;

  export type Response = RmqResponse<OnCreateAccountTokenResponse>;
}
