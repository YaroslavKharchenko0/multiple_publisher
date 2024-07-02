import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { role } from './role.validation'

export const deleteRoleValidationSchema = z.object({
  role,
})

export type DeleteRoleRequest = z.infer<typeof deleteRoleValidationSchema>

export class DeleteRoleBodyDto extends createZodDto(deleteRoleValidationSchema) { }

export type DeleteRoleResponse = null;

