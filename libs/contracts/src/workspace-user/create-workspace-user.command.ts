import { RmqResponse } from '../common';
import {
  CreateWorkspaceUserRequest,
  CreateWorkspaceUserResponse,
} from '@app/validation';

export namespace CreateWorkspaceUserCommand {
  export const exchange = 'workspace-user';

  export const routingKey = 'create-workspace-user';

  export const queue = 'create-workspace-user';

  export type Request = CreateWorkspaceUserRequest;

  export type ResponsePayload = CreateWorkspaceUserResponse;

  export type Response = RmqResponse<CreateWorkspaceUserResponse>;
}
