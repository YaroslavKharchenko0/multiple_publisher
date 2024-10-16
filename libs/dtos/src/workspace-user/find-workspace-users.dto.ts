import { findWorkspaceUsersValidation } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindWorkspaceUsersDto extends createZodDto(findWorkspaceUsersValidation) { }
