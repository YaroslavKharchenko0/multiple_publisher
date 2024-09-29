import { findRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindRoleBodyDto extends createZodDto(findRoleValidationSchema) { }
