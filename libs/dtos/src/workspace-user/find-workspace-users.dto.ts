import { findWorkspaceUsersValidation } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindWorkspaceUsersDto extends createZodDto(findWorkspaceUsersValidation) { }
