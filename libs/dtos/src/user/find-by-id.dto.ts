import { findByIdValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindByIdBodyDto extends createZodDto(findByIdValidationSchema) { }
