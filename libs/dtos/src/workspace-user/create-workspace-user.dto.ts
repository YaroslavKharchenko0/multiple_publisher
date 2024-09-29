import { createWorkspaceUserBodyValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class CreateWorkspaceUserDto extends createZodDto(createWorkspaceUserBodyValidationSchema) { }

