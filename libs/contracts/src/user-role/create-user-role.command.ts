import { RmqResponse } from '../common'
import { CreateUserRoleRequest, CreateUserRoleResponse } from '@app/validation'

export namespace CreateUserRoleCommand {
  export const exchange = 'user-role';

  export const routingKey = 'create-user-role';

  export const queue = 'create-user-role';

  export type Request = CreateUserRoleRequest;

  export type ResponsePayload = CreateUserRoleResponse;

  export type Response = RmqResponse<CreateUserRoleResponse>
}

