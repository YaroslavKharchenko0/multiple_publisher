import { deleteUserValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class DeleteUserBodyDto extends createZodDto(deleteUserValidationSchema) { }
