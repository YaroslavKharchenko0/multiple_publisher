import { findByIdWorkspaceValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class FindByIdWorkspaceBodyDto extends createZodDto(findByIdWorkspaceValidationSchema) { }
