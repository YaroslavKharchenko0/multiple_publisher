import { createFileValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class CreateFileBodyDto extends createZodDto(createFileValidationSchema) { }
