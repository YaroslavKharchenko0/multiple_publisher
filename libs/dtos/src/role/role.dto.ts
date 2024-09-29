import { roleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class RoleDto extends createZodDto(roleValidationSchema) { }

