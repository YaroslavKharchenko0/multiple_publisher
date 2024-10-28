import { findByProviderIdValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindByProviderIdBodyDto extends createZodDto(findByProviderIdValidationSchema) { }
