import { deleteWorkspaceUserValidation } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class DeleteWorkspaceUserDto extends createZodDto(deleteWorkspaceUserValidation) { }
