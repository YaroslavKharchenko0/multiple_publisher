import { findRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindRoleBodyDto extends createZodDto(findRoleValidationSchema) { }
