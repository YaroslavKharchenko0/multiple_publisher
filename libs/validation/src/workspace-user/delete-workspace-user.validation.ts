import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { userId } from "../user";
import { workspaceId } from "../workspace";
import { WorkspaceUser } from './workspace-user.validation';

export const deleteWorkspaceUserValidation = z.object({
  userId,
  workspaceId,
})

export type DeleteWorkspaceUserRequest = z.infer<typeof deleteWorkspaceUserValidation>

export class DeleteWorkspaceUserDto extends createZodDto(deleteWorkspaceUserValidation) { }

export type DeleteWorkspaceUserResponse = WorkspaceUser
