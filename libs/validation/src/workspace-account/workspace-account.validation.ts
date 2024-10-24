import { z } from 'zod';
import { workspaceId } from '../workspace/workspace.validation';
import { accountId } from '../account/account.validation';

export const workspaceAccountId = z.number().int().positive();

export const workspaceAccountValidationSchema = z.object({
  id: workspaceAccountId,
  workspaceId,
  accountId,
});

export type WorkspaceAccount = z.infer<typeof workspaceAccountValidationSchema>;
