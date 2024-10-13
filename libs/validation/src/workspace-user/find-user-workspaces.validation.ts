import { z } from 'zod';
import { userId } from '../user';
import { WorkspaceUser } from './workspace-user.validation';
import { paginationValidationSchema, PaginationMetadata } from '../common';

export const findUserWorkspacesValidation = z.object({
  userId,
  pagination: paginationValidationSchema,
});

export type FindUserWorkspacesRequest = z.infer<
  typeof findUserWorkspacesValidation
>;

export type FindUserWorkspacesResponse = {
  workspaces: WorkspaceUser[];
  metadata: PaginationMetadata;
};
