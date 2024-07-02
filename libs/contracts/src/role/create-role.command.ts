import { RmqResponse } from '../common'
import { CreateRoleRequest, CreateRoleResponse } from '@app/validation'

export namespace CreateRoleCommand {
  export const exchange = 'role';

  export const routingKey = 'create-role';

  export const queue = 'create-role';

  export type Request = CreateRoleRequest;

  export type ResponsePayload = CreateRoleResponse;

  export type Response = RmqResponse<CreateRoleResponse>
}

