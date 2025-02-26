import { Role as RoleEnum } from '@app/types'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const role = z.nativeEnum(RoleEnum)
export const roleId = z.number()

const roleValidationSchema = z.object({
  id: roleId,
  role,
})

export type Role = z.infer<typeof roleValidationSchema>

export class RoleDto extends createZodDto(roleValidationSchema) { }

