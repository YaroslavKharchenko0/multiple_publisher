import { userRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class UserRoleDto extends createZodDto(userRoleValidationSchema) { }
