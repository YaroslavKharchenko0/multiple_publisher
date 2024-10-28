import { findWorkspaceUserValidation } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindWorkspaceUserDto extends createZodDto(findWorkspaceUserValidation) { }
