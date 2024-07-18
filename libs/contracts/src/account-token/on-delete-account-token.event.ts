import { RmqResponse } from '../common';
import {
  OnDeleteAccountTokensRequest,
  OnDeleteAccountTokensResponse,
} from '@app/validation';

export namespace OnDeleteAccountTokensEvent {
  export const exchange = 'account-token';

  export const routingKey = 'on-delete-account-tokens';

  export const queue = 'on-delete-account-tokens';

  export type Request = OnDeleteAccountTokensRequest;

  export type ResponsePayload = OnDeleteAccountTokensResponse;

  export type Response = RmqResponse<OnDeleteAccountTokensResponse>;
}
