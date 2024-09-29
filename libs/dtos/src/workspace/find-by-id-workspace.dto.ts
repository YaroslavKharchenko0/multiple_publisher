import { findByIdWorkspaceValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class FindByIdWorkspaceBodyDto extends createZodDto(findByIdWorkspaceValidationSchema) { }
