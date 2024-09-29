import { deleteUserValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class DeleteUserBodyDto extends createZodDto(deleteUserValidationSchema) { }
