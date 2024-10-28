import { userRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class UserRoleDto extends createZodDto(userRoleValidationSchema) { }
