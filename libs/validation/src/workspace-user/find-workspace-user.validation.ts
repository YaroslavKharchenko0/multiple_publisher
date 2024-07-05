import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { userId } from "../user";
import { workspaceId } from "../workspace";
import { WorkspaceUser } from './workspace-user.validation';

export const findWorkspaceUserValidation = z.object({
  userId,
  workspaceId,
})

export type FindWorkspaceUserRequest = z.infer<typeof findWorkspaceUserValidation>

export class FindWorkspaceUserDto extends createZodDto(findWorkspaceUserValidation) { }

export type FindWorkspaceUserResponse = WorkspaceUser
