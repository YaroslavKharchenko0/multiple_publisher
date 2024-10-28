import { RmqResponse } from '../common';
import { CreateAccountRequest, CreateAccountResponse } from '@app/validation';

export namespace CreateAccountCommand {
  export const exchange = 'account';

  export const routingKey = 'create-account';

  export const queue = 'create-account';

  export type Request = CreateAccountRequest;

  export type ResponsePayload = CreateAccountResponse;

  export type Response = RmqResponse<CreateAccountResponse>;
}
