import { updateWorkspaceUserBodyValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class UpdateWorkspaceUserDto extends createZodDto(updateWorkspaceUserBodyValidationSchema) { }
