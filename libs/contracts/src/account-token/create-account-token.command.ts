import { RmqResponse } from '../common';
import {
  CreateAccountTokenRequest,
  CreateAccountTokenResponse,
} from '@app/validation';

export namespace CreateAccountTokenCommand {
  export const exchange = 'account-token';

  export const routingKey = 'create-account-token';

  export const queue = 'create-account-token';

  export type Request = CreateAccountTokenRequest;

  export type ResponsePayload = CreateAccountTokenResponse;

  export type Response = RmqResponse<CreateAccountTokenResponse>;
}
