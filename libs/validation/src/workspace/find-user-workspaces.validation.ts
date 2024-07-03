import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { Workspace } from './workspace.validation'
import { userId } from '../user'

export const findUserWorkspacesValidationSchema = z.object({
  userId,
})

export type FindUserWorkspacesRequest = z.infer<typeof findUserWorkspacesValidationSchema>

export class FindUserWorkspacesBodyDto extends createZodDto(findUserWorkspacesValidationSchema) { }

export type FindUserWorkspacesResponse = Workspace
