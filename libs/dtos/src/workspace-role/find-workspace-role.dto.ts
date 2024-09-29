import { findWorkspaceRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindWorkspaceRoleDto extends createZodDto(findWorkspaceRoleValidationSchema) { }
