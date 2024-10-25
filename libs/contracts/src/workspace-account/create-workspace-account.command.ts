import { RmqResponse } from '../common';
import {
  CreateWorkspaceAccountRequest,
  CreateWorkspaceAccountResponse,
} from '@app/validation';

export namespace CreateWorkspaceAccountCommand {
  export const exchange = 'workspace-account';

  export const routingKey = 'create-workspace-account';

  export const queue = 'create-workspace-account';

  export type Request = CreateWorkspaceAccountRequest;

  export type ResponsePayload = CreateWorkspaceAccountResponse;

  export type Response = RmqResponse<CreateWorkspaceAccountResponse>;
}
