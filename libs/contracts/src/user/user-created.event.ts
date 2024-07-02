import { RmqResponse } from '../common'
import { UserCreatedRequest, UserCreatedResponse } from '@app/validation'

export namespace UserCreatedEvent {
  export const exchange = 'user';

  export const routingKey = 'user-created';

  export const queue = 'user-created';

  export type Request = UserCreatedRequest;

  export type ResponsePayload = UserCreatedResponse;

  export type Response = RmqResponse<UserCreatedResponse>
}

