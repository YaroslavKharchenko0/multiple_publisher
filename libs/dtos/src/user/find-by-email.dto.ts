import { findByEmailValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindByEmailBodyDto extends createZodDto(findByEmailValidationSchema) { }
