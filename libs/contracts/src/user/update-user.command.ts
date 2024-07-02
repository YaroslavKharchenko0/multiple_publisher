import { RmqResponse } from '../common'
import { UpdateUserRequest, UpdateUserResponse } from '@app/validation'

export namespace UpdateUserQuery {
  export const exchange = 'user';

  export const routingKey = 'update-user';

  export const queue = 'update-user';

  export type Request = UpdateUserRequest;

  export type ResponsePayload = UpdateUserResponse;

  export type Response = RmqResponse<UpdateUserResponse>
}

