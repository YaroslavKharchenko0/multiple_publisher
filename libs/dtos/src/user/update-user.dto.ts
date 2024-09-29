import { updateUserBodyValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class UpdateUserBodyDto extends createZodDto(updateUserBodyValidationSchema) { }
