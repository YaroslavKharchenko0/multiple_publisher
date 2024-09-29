import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { Workspace, workspaceName } from './workspace.validation';
import { userId } from '../user';

export const createWorkspaceValidationSchema = z.object({
  name: workspaceName,
  userId,
});

export type CreateWorkspaceRequest = z.infer<
  typeof createWorkspaceValidationSchema
>;

export const createWorkspaceBodyValidationSchema =
  createWorkspaceValidationSchema.omit({ userId: true });

export class CreateWorkspaceBodyDto extends createZodDto(
  createWorkspaceBodyValidationSchema,
) { }

export type CreateWorkspaceResponse = Workspace;
