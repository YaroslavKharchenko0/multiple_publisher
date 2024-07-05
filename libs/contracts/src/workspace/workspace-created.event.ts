import { RmqResponse } from '../common'
import { WorkspaceCreatedRequest, WorkspaceCreatedResponse } from '@app/validation'

export namespace WorkspaceCreatedEvent {
  export const exchange = 'workspace';

  export const routingKey = 'workspace-created';

  export const queue = 'workspace-created';

  export type Request = WorkspaceCreatedRequest;

  export type ResponsePayload = WorkspaceCreatedResponse;

  export type Response = RmqResponse<WorkspaceCreatedResponse>
}

