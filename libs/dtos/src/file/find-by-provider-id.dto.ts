import { findFileByProviderIdValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindFileByProviderIdBodyDto extends createZodDto(findFileByProviderIdValidationSchema) { }
