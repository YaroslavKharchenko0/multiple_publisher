import { RmqResponse } from '../common'
import { CreateUserRequest, CreateUserResponse } from '@app/validation'

export namespace CreateUserCommand {
  export const exchange = 'user';

  export const routingKey = 'create-user';

  export const queue = 'create-user';

  export type Request = CreateUserRequest;

  export type ResponsePayload = CreateUserResponse;

  export type Response = RmqResponse<CreateUserResponse>
}

