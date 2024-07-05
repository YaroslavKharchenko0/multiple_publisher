import { Workspace, WorkspaceDto } from './workspace.validation'

export type WorkspaceCreatedRequest = Workspace

export class WorkspaceCreatedBodyDto extends WorkspaceDto { }

export type WorkspaceCreatedResponse = null
