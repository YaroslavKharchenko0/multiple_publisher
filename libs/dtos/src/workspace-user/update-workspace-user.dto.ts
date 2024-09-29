import { updateWorkspaceUserBodyValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class UpdateWorkspaceUserDto extends createZodDto(updateWorkspaceUserBodyValidationSchema) { }
