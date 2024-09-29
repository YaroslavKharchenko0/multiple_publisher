import { deleteUserRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class DeleteUserRoleDto extends createZodDto(deleteUserRoleValidationSchema) { }
