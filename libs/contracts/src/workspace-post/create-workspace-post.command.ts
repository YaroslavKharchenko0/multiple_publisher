import { RmqResponse } from '../common';
import {
  CreateWorkspacePostRequest,
  CreateWorkspacePostResponse,
} from '@app/validation';

export namespace CreateWorkspacePostCommand {
  export const exchange = 'workspace-post';

  export const routingKey = 'create-workspace-post';

  export const queue = 'create-workspace-post';

  export type Request = CreateWorkspacePostRequest;

  export type ResponsePayload = CreateWorkspacePostResponse;

  export type Response = RmqResponse<CreateWorkspacePostResponse>;
}
