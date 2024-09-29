import { createFileValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class CreateFileBodyDto extends createZodDto(createFileValidationSchema) { }
