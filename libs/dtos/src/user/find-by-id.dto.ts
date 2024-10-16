import { findByIdValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindByIdBodyDto extends createZodDto(findByIdValidationSchema) { }
