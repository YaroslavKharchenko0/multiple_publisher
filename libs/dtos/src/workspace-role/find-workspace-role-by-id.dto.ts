import { findWorkspaceRoleByIdValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindWorkspaceRoleByIdDto extends createZodDto(findWorkspaceRoleByIdValidationSchema) { }
