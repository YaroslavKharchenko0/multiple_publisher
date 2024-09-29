import { findWorkspaceUserValidation } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindWorkspaceUserDto extends createZodDto(findWorkspaceUserValidation) { }
