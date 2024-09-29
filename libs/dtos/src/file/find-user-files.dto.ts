import { findUserFilesValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindUserFilesBodyDto extends createZodDto(findUserFilesValidationSchema) { }
