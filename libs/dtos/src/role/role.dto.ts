import { roleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class RoleDto extends createZodDto(roleValidationSchema) { }

