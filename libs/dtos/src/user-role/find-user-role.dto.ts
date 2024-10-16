import { findUserRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindUserRoleDto extends createZodDto(findUserRoleValidationSchema) { }
