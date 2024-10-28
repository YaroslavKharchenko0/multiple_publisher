import { findWorkspaceRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindWorkspaceRoleDto extends createZodDto(findWorkspaceRoleValidationSchema) { }
