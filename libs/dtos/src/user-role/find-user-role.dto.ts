import { findUserRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindUserRoleDto extends createZodDto(findUserRoleValidationSchema) { }
