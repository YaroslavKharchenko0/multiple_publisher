import { RmqResponse } from '../common'
import { DeleteUserRequest, DeleteUserResponse } from '@app/validation'

export namespace DeleteUserCommand {
  export const exchange = 'user';

  export const routingKey = 'delete-user';

  export const queue = 'delete-user';

  export type Request = DeleteUserRequest;

  export type ResponsePayload = DeleteUserResponse;

  export type Response = RmqResponse<DeleteUserResponse>
}

