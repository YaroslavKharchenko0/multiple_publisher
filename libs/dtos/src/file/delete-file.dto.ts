import { deleteFileValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class DeleteFileBodyDto extends createZodDto(deleteFileValidationSchema) { }
