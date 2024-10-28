import { findFileByProviderIdValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindFileByProviderIdBodyDto extends createZodDto(findFileByProviderIdValidationSchema) { }
