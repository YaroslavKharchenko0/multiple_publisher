import { RmqResponse } from '../common'
import { DeleteUserRequest, DeleteUserResponse } from '@app/validation'

export namespace DeleteUserQuery {
  export const exchange = 'user';

  export const routingKey = 'update-user';

  export const queue = 'update-user';

  export type Request = DeleteUserRequest;

  export type ResponsePayload = DeleteUserResponse;

  export type Response = RmqResponse<DeleteUserResponse>
}

