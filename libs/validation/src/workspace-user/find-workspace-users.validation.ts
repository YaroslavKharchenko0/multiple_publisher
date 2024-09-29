import { z } from 'zod'
import { workspaceId } from "../workspace";
import { WorkspaceUser } from './workspace-user.validation';
import { paginationValidationSchema } from '../common';

export const findWorkspaceUsersValidation = z.object({
  workspaceId,
  pagination: paginationValidationSchema,
})

export type FindWorkspaceUsersRequest = z.infer<typeof findWorkspaceUsersValidation>

export type FindWorkspaceUsersResponse = WorkspaceUser
