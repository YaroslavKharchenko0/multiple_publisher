import { deleteFileValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class DeleteFileBodyDto extends createZodDto(deleteFileValidationSchema) { }
