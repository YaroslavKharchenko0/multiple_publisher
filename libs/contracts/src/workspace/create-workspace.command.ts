import { RmqResponse } from '../common';
import {
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
} from '@app/validation';

export namespace CreateWorkspaceCommand {
  export const exchange = 'workspace';

  export const routingKey = 'create-workspace';

  export const queue = 'create-workspace';

  export type Request = CreateWorkspaceRequest;

  export type ResponsePayload = CreateWorkspaceResponse;

  export type Response = RmqResponse<CreateWorkspaceResponse>;
}
