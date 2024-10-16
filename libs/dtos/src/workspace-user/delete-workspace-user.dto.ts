import { deleteWorkspaceUserValidation } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class DeleteWorkspaceUserDto extends createZodDto(deleteWorkspaceUserValidation) { }
