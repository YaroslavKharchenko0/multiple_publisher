import { findByProviderIdValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindByProviderIdBodyDto extends createZodDto(findByProviderIdValidationSchema) { }
