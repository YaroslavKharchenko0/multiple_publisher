import { findWorkspaceRoleByIdValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindWorkspaceRoleByIdDto extends createZodDto(findWorkspaceRoleByIdValidationSchema) { }
