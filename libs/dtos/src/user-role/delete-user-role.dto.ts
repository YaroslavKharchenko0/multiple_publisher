import { deleteUserRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class DeleteUserRoleDto extends createZodDto(deleteUserRoleValidationSchema) { }
