import { findByEmailValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindByEmailBodyDto extends createZodDto(findByEmailValidationSchema) { }
