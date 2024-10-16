import { createWorkspaceUserBodyValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class CreateWorkspaceUserDto extends createZodDto(createWorkspaceUserBodyValidationSchema) { }

